import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditProfileForm from './../components/Account/EditProfileForm'
import ProfileGalleryPicker from './../components/Photographer/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'


import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <img className="profile_gallery_image" src={value.src} alt=""/>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="sortable_profile_gallery_container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class ManagePhotosScreen extends Component {

  state = {
    user: null,
    unauthorized: false,
    items: [
      { src: "/dist/assets/kimono.jpg"} , 
      { src: "/dist/assets/bike.png" }
    ]
  }

  onSortEnd = ({oldIndex, newIndex}) => {
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
      } else {
        throw new Error("bad request")
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  componentWillUpdate() {

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
            <p className='tip'>Drag the pictures around in order to change the display order</p>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />
          </div>
        </div>
      )
    } else {
      return (<div></div>)

    }
  }

}
