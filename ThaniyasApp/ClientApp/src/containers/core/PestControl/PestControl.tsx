﻿import { IonItem, IonContent, IonPage, IonList, IonLoading, IonSelectOption, IonLabel, IonSelect } from '@ionic/react';
import React, { useState } from 'react';
//import './Reg.scss';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { getPestControlList } from '../../../store/actions/PestControl';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
interface Props extends RouteComponentProps { }

interface IPestControlProps {
  dispatch: Dispatch<any>;
  pestControlData: any;
  route: RouteComponentProps;
}


const PestControl: React.SFC<IPestControlProps & RouteComponentProps> = ({ dispatch, pestControlData, history }) => {
  React.useEffect(() => {
    dispatch(getPestControlList());
  }, []);

  const [showPopover, setShowPopover] = useState(false);
  const [PestControl, setPestControl] = useState();
  const onEditSeedClick = (id:any) => {
    setPestControl(id);
    history.push("/pestControlEditPage/" + id);
  }

  const onDeleteSeedClick = () => {
    alert("DELETE");
  }

  const [showLoading, setShowLoading] = useState(true);

  const [PestControlgData, setPestControlData] = useState([]);

  if (pestControlData.PetsControlItems.length > 0 && PestControlgData.length === 0) {
    setPestControlData(pestControlData.PetsControlItems);
  }
  const PetsControlItems: any = (PestControlgData || []);
  const PetsControlList: any = [];
  PetsControlItems.forEach((PetsControlItems: any) => PetsControlList.push(
    <IonItem key={PetsControlItems.id}>
      <IonLabel> {PetsControlItems.nameofthePestSide} </IonLabel>
        <img src="assets/Edit.png" height="15" width="15" className="edit-icon" onClick={() => onEditSeedClick(PetsControlItems.id)}></img>
      <img src="assets/Delete.png" height="23" width="23" className="del-icon" onClick={() => onDeleteSeedClick} ></img>
    </IonItem>));
  return (
    <IonPage>
      <Header />
      <IonContent className=".reg-login">
        <div className="bg-image">
          <div className="reg-head">
            <h1>Pest Control List</h1>
          </div>

          <form className="form">
            <IonItem className="MLand-Lbl">
              <label className="lbl"> Pest Control Details </label>
              <a className="add-btn" onClick={() => (setShowLoading(true) == history.push("/pestControlDetails"))}>  ADD  </a>
              <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={2000}
              />
            </IonItem>
            <IonList>
              {PetsControlList}
            </IonList>
          </form>         
        </div>
      </IonContent>      
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  const { pestControlData } = state;

  return {
    pestControlData
  };
};

const Child = withRouter(PestControl as any);
export default connect(mapStateToProps)(Child);
