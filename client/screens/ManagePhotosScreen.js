import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditProfileForm from './../components/Account/EditProfileForm'
import ProfileGalleryPicker from './../components/Photographer/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

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

export default class ManagePhotosScreen extends Component {

  state = {
    isSorting: false,
    user: null,
    unauthorized: false,
    items: [
    ]
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
    ClientAPI.getUserAccount().then((res) => {
      if (res.statusCode === 401) {
        this.setState({ unauthorized: true })
      } else if (res.body.providers) {
        this.setState({ user: res.body })
        this.prettyDashboard()
        this.loadUserPhotos()
      } else {
        throw new Error("bad request")
      }
    }).catch((err) => {
      console.log(err)
    })
  } 

  loadUserPhotos() {
    const user = Config.getCurrentUser()

    ClientAPI.getUserPhotos(user.id).then((res) => {
      this.setState({ items: res.body })
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillUpdate() {

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
        maxFileSize: 1000000,
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
    if (this.state.unauthorized) {
      return (
        <Redirect to="/signin"/>
      )
    }

    if (this.state.user) {
      return (
        <div className='user_settings_container container'>
          <div className='user_settings_navigation col-xs-12 col-sm-12 '>
            <ul>
              <li><Link to="/account/manage">Edit Profile</Link></li>
              <li className="active"><Link to="/account/manage/photos">Manage Photos</Link></li>
            </ul>
          </div>
          <div className='user_settings_panel col-xs-12 col-sm-12 '>
            <div className="upload_modal_btn">+ Upload Photos</div>
            <div className="upload_dashboard_container"></div>

            <h3>My Photos</h3>

            <p className='tip'>Drag the pictures around in order to change the display order</p>
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
        </div>
      )
    } else {
      return (<div></div>)

    }
  }

}

// <SortableList items={this.state.items} isSorting={this.state.isSorting} onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} onDeleteClick={this.onDeleteClick} axis="xy" helperClass="dragging_item" />
