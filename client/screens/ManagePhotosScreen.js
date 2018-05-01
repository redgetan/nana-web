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

const SortableItem = SortableElement(({value}) =>
  <img className="profile_gallery_image" src={value.src} alt=""/>
);

const SortableList = SortableContainer(({items, isSorting}) => {
  console.log("isSorting: " + isSorting + " props: ")
  return (
    <ul className={`sortable_profile_gallery_container ${isSorting ? "dragging_mode" : ""}`}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
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
      { src: "/dist/assets/kimono.jpg"} , 
      { src: "/dist/assets/bike.png" }
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
        // this.prettyDashboard()
        this.simpleDashboard()
      } else {
        throw new Error("bad request")
      }
    }).catch((err) => {
      debugger
      console.log("fail..")
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
        maxNumberOfFiles: 3,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      }
    })
    .use(Dashboard, {
      trigger: '.UppyModalOpenerBtn',
      inline: true,
      target: '.upload_dashboard_container',
      replaceTargetContent: true,
      showProgressDetails: true,
      note: 'Images only, 2–3 files, up to 1 MB',
      height: 470,
      metaFields: [
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
      ]
    })
    .use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io' })
    .use(Instagram, { target: Dashboard, host: 'https://server.uppy.io' })
    .use(AwsS3, { getUploadParameters(file) { return self.getUploadParameters(file) } })
    .run()

    uppy.on('complete', result => {
      console.log('successful files:', result.successful)
      console.log('failed files:', result.failed)
    })
  }

  simpleDashboard() {
    const uppy = Uppy({
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    }).use(Dashboard, { trigger: '#select-files' })
      .use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io' })
      .use(AwsS3, { getUploadParameters(file) { return self.getUploadParameters(file) } })
      .run()


    uppy.on('file-added', (file) => {
      console.log('Added file', file)
    })

    uppy.on('complete', (result) => {
      // const url = result.successful[0].uploadURL
      // store.dispatch({
      //   type: SET_USER_AVATAR_URL,
      //   payload: { url: url }
      // })
    })

    this.setState({ uppy: uppy })
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
            { 
              this.state.uppy && 
                <DragDrop
                  uppy={this.state.uppy}
                  locale={{
                    strings: {
                      chooseFile: 'Pick a new avatar'
                    }
                  }}
                />
            }

            <div className="upload_dashboard_container"></div>

            <p className='tip'>Drag the pictures around in order to change the display order</p>
            <SortableList items={this.state.items} isSorting={this.state.isSorting} onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} axis="xy" helperClass="dragging_item" />
          </div>
        </div>
      )
    } else {
      return (<div></div>)

    }
  }

}
