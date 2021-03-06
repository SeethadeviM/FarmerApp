﻿import { IonItem, IonContent, IonPage, IonAlert, IonSelectOption, IonLabel, IonSelect, IonList } from '@ionic/react';
import React, { useState } from 'react';
//import './Reg.scss';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getWeedRemoveList, deleteWeedRemove } from '../../../store/actions/WeedRemove';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps { }

interface IWeedRemoveProps {
  dispatch: Dispatch<any>;
  weedRemoveData: any;
  route: RouteComponentProps;
}

const WeedRemove: React.SFC<IWeedRemoveProps & RouteComponentProps> = ({ dispatch, weedRemoveData, history}) => {

  React.useEffect(() => {
    dispatch(getWeedRemoveList());
  }, []);
  const [showPopover1, setShowPopover1] = useState(false);
  // <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
  //const onaddClick = () => {
  //alert("Edit");
  // window.location.href ="/landDetails";
  // setShowModal(true);
  //isShowAddEditModal: true;
  //setShowModal(false);
  //<button onClick={() => onaddClick}> add  </button>
  //}
  const [showAlert1, setShowAlert1] = useState(false);
  const [weedRemoveDel, setWeedRemoveDel] = useState();
  const onDeleteWeedRemoveClick = (id: any) => {
    setShowAlert1(true);
    setWeedRemoveDel(id);
    dispatch(deleteWeedRemove(id));
  }

  const [WeedRemove, setWeedRemove] = useState();
  const onEditWeedRemoveClick = (id:any) => {
    setWeedRemove(id);
    history.push("/weedRemoveEditPage/" + id);
  }

  const [WeedData, setWeedRemoveData] = useState([]);

  if (weedRemoveData.WeedItems.length > 0 && WeedData.length === 0) {
    setWeedRemoveData(weedRemoveData.WeedItems);
  }
  const WeedItems: any = (WeedData || []);
  const WeeditemLandList: any = [];
  WeedItems.forEach((WeedItems: any) => WeeditemLandList.push(
    <IonItem key={WeedItems.id}>
      <IonLabel> {WeedItems.nOofLabours} </IonLabel>
     
        <img src="assets/Edit.png" height="15" width="15" className="edit-icon" onClick={() => onEditWeedRemoveClick(WeedItems.id)}></img>
     
      <img src="assets/Delete.png" height="23" width="23" className="del-icon" onClick={() => onDeleteWeedRemoveClick(WeedItems.id)} ></img>
    </IonItem>));

  return (
    <IonPage>
      <Header />
      <IonContent className=".reg-login">
        <div className="bg-image">
          <div className="reg-head">
            <h1>Weed Remove List </h1>
          </div>

          <form className="form">
            <IonItem className="MLand-Lbl">
              <label className="lbl"> Weed Remove Details </label>
              <a onClick={() => {

                history.push("/weedRemoveDetails")
              }}

                className="add-btn">  ADD  </a>
            </IonItem>
            <IonList>
              {WeeditemLandList}
            </IonList>
          </form>
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            // header={'Alert'}
            // subHeader={'Subtitle'}
            message={'Successfully Deleted'}
            buttons={['OK']}
          />
        </div>
      </IonContent>      
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  const { weedRemoveData } = state;

  return {
    weedRemoveData
  };
};

const Child = withRouter(WeedRemove as any);
export default connect(mapStateToProps)(Child);

