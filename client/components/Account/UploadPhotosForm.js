import React, { Component } from 'react'
import classNames from 'classnames'
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'

const Uppy = require('uppy/lib/core')
const Dashboard = require('uppy/lib/plugins/Dashboard')
const DragDrop = require('uppy/lib/react/DragDrop')
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive')
const Instagram = require('uppy/lib/plugins/Instagram')
const AwsS3 = require('uppy/lib/plugins/AwsS3')
const Tus = require('uppy/lib/plugins/Tus')


import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value, onDeleteClick}) =>
  <div className="profile_gallery_image_container" data-photo-id={value.id}>
    <div className="photo_delete_btn" onClick={onDeleteClick}><i className="glyphicon glyphicon-remove"></i></div>
    <img className="profile_gallery_image" src={value.src} alt=""/>
  </div>
);

const SortableList = SortableContainer(({items, isSorting, onDeleteClick}) => {
  console.log("isSorting: " + isSorting + " props: ")
  return (
    <ul className={`sortable_profile_gallery_container ${isSorting ? "dragging_mode" : ""}`}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} onDeleteClick={onDeleteClick} />
      ))}
    </ul>
  );
});


export default class UploadPhotosForm extends Component {

  state = {
    isSorting: false,
    items: [
    ]
  }

  setOnStepSuccess(listener) {
    this.onStepSuccess = listener
  }

  handleNext() {
    ClientAPI.completeServicesStep(this.props.user.id, "upload_photos").then((res) => {
      const user = res.body

      Config.setUserData(user)
      this.props.onUserUpdated(user)

      this.onStepSuccess()
    })
  }

  onSortStart = ({node, index, collection}, event) => {
    console.log("start...")
    this.setState({ isSorting: true })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({ isSorting: false })

    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    })
  }

  componentDidMount() {
    if (this.props.user) {
      this.prettyDashboard()
      this.loadUserPhotos()
    }
  } 

  loadUserPhotos() {
    const user = this.props.user

    ClientAPI.getUserPhotos(user.id).then((res) => {
      this.setState({ items: res.body })
    }).catch((err) => {
      console.log(err)
    })
  }

  getUploadParameters(file) {
    return ClientAPI.s3Sign({ filename: file.name }).then((res) => {
      const data = res.body

      return {
        method: "PUT",
        url: data.url,
        fields: data.fields
      }
    })
  }


  prettyDashboard() {
    const self = this

    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 5000000,
        maxNumberOfFiles: 5,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      }
    })
    .use(Dashboard, {
      trigger: '.upload_modal_btn',
      inline: false,
      target: '.upload_dashboard_container',
      replaceTargetContent: true,
      showLinkToFileUploadResult: false,
      showProgressDetails: true,
      note: 'Images only, 1–5 files, up to 1 MB',
      height: 470,
      metaFields: [
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
      ]
    })
    .use(AwsS3, { getUploadParameters(file) { return self.getUploadParameters(file) } })
    .run()

    uppy.on('complete', result => {
      this.assignPhotosToUser(result.successful)
    })
  }

  assignPhotosToUser(uploadedFiles) {
    const promises = uploadedFiles.map((uploadedFile) => {
      const s3Url = uploadedFile.uploadURL.replace(/\?.*/,'') // remove query params
      return ClientAPI.createPhoto({ src: s3Url })         
    })

    return Promise.all(promises).then(() => {
      this.loadUserPhotos()
    })
  }

  simpleDashboard() {
    const uppy = Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    })

    uppy.use(Tus, { endpoint: '/upload' })

    // .use(Dashboard, { trigger: '#select-files' })
    // uppy.use(AwsS3, { getUploadParameters(file) { return self.getUploadParameters(file) } })
    
    uppy.run()

    uppy.on('file-added', (file) => {
      console.log('Added file', file)
    })

    uppy.on('complete', (result) => {
      const url = result.successful[0].uploadURL
      // store.dispatch({
      //   type: SET_USER_AVATAR_URL,
      //   payload: { url: url }
      // })
    })

    this.setState({ uppy: uppy })
  }

  onDeleteClick = (e) => {
    const photoId = $(e.target).closest(".profile_gallery_image_container").data("photo-id")

    ClientAPI.deletePhoto(photoId).then((res) => {
      const newItems = this.removeFromItemsByPhotoId(photoId)

      this.setState({ items: newItems })
    }).catch((err) => {
      console.log(err)
    })
  }

  onPhotoGalleryClick = (e) => {
    const isDeleteBtnClicked = $(e.target).closest(".photo_delete_btn").length > 0  
    if (isDeleteBtnClicked) {
      return this.onDeleteClick(e)
    }
  }

  removeFromItemsByPhotoId(photoId) {
    let items = this.state.items

    let indexToRemove = items.findIndex((item) => {
      return item.id === photoId
    })

    items.splice(indexToRemove, 1)

    return items
  }


  render() {
    return (
      <div>
        <div className="upload_modal_btn">+ Upload Photos</div>
        <div className="upload_dashboard_container"></div>

        <h3>My Photos</h3>

        <div className="photo_gallery_list_container" onClick={this.onPhotoGalleryClick}>
          {
            this.state.items.map((item, index) => (
              <div key={index} className="profile_gallery_image_container" data-photo-id={item.id}>
                <div className="photo_delete_btn"><i className="glyphicon glyphicon-remove"></i></div>
                <img className="profile_gallery_image" src={item.src} alt=""/>
              </div>
               
            ))
          }
        </div>
      </div>
    )
  }
}

// <SortableList items={this.state.items} isSorting={this.state.isSorting} onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} onDeleteClick={this.onDeleteClick} axis="xy" helperClass="dragging_item" />
