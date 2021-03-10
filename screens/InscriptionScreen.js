import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import HomeImage from '../components/HomeImage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IPadress from "../url"
import {connect} from 'react-redux';


export function InscriptionScreen(props) {
    const [emailSignUp, setEmailSignUp] = useState();
    const [lastNameSignUp, setLastNameSignUp] = useState();
    const [roomNumberSignUp, setRoomNumberSignUp] = useState();
    const [isInscription,setIsInscription] = useState(true);
    const [signInEmail, setSignInEmail] = useState('')
    const [signInName, setSignInName] = useState('')
    const [signInRoom, setSignInRoom] = useState('')
    const [localToken, setLocalToken] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignin, setErrorsSignin] = useState([])
    const [listErrorsSignup, setErrorsSignup] = useState([])


   

    var handleSubmitSignup = async () => {
      const data = await fetch(`http://${IPadress}:3000/sign-up`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `lastnameFromFront=${lastNameSignUp}&emailFromFront=${emailSignUp}&roomNumberFromFront=${roomNumberSignUp}&token=`
      })
      const body = await data.json()

     if(body.result == true){
      props.addToken(body.token)
      setLocalToken(body.token)
      AsyncStorage.setItem('token', body.token);
      props.navigation.navigate('Question1');
      } else {
      setErrorsSignup(body.error)
    } 
console.log(localToken,'signUp local')
  }

    var handleSubmitSignin = async () => {
 
      const data = await fetch(`http://${IPadress}:3000/sign-in`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `emailFromFront=${signInEmail}&lastnameFromFront=${signInName}&roomNumberFromFront=${signInRoom}`
      })
  
      const body = await data.json()


      if(body.result == true){
        props.addToken(body.token)
        props.navigation.navigate("BottomNavigator")
        setLocalToken(body.token)
        AsyncStorage.setItem('token', body.token);
        
      }  else {
        setErrorsSignin(body.error)
        console.log("il y a une erreur") 
      
      }
      console.log('signIn local', localToken)
    }


var backGroundInscription =''
var backGroundConnexion =''
    if(isInscription){
     backGroundInscription = { alignItems: "center",padding: 10,width: '50%',fontWeight: 'bold',marginBottom: 20,borderColor: '#AADEC0',borderBottomWidth: 2,backgroundColor:'#AADEC0'}
     backGroundConnexion ={ alignItems: "center",padding: 10,width: '50%',fontWeight: 'bold',marginBottom: 20,borderColor: '#AADEC0',borderBottomWidth: 2}
    }else{
      backGroundConnexion = { alignItems: "center",padding: 10,width: '50%',fontWeight: 'bold',marginBottom: 20,borderColor: '#AADEC0',borderBottomWidth: 2,backgroundColor:'#AADEC0'}
      backGroundInscription ={ alignItems: "center",padding: 10,width: '50%',fontWeight: 'bold',marginBottom: 20,borderColor: '#AADEC0',borderBottomWidth: 2}
    }
     
    
  return (
    <View style={styles.container}>
    
    <HomeImage/>
   
    <View>
    <View style={{ flexDirection: 'row',borderColor:'black'}}>
      <TouchableOpacity
      style={ backGroundInscription}
      onPress={() => {setIsInscription(true)}} >
      <Text style={styles.textLogin}>Inscription</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={backGroundConnexion}
      onPress={() => {setIsInscription(false)}} >
      <Text style={styles.textLogin}>Connexion</Text>
    </TouchableOpacity>
    </View>

      </View> 

      
 
    {isInscription?<><Text style={styles.textLogin}>Inscription</Text>
    
    
    <Text style={{marginTop:20}} >Adresse e-mail</Text>
   <Input textAlign='center' placeholder='Fred@gmail.com'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setEmailSignUp(value)}
     value={emailSignUp}
   />
     <Text>Nom</Text>
   <Input textAlign='center' placeholder='Fred'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setLastNameSignUp(value)}
     value={lastNameSignUp}
   />
    <Text>N° de chambre</Text>
   <Input textAlign='center' keyboardType='numeric' placeholder='55'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setRoomNumberSignUp(value)}
     value={roomNumberSignUp}
   />
  <TouchableOpacity
      style={styles.button}
      onPress={() => {handleSubmitSignup()}} >
      <Text>Valider</Text>
    </TouchableOpacity>

<Text style={styles.textError}>{listErrorsSignup}</Text></> : <><Text style={styles.textLogin}>Connexion</Text>

    
    
    <Text style={{marginTop:20}} >Adresse e-mail</Text>
   <Input textAlign='center' placeholder='Fred@gmail.com'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setSignInEmail(value)}
     value={signInEmail}
   />
     <Text>Nom</Text>
   <Input textAlign='center' placeholder='Fred'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setSignInName(value)}
     value={signInName}
   />
    <Text>N° de chambre</Text>
   <Input textAlign='center' keyboardType='numeric' placeholder='55'
    containerStyle = {{marginBottom: 5, width: '55%'}}
     onChangeText={(value) => setSignInRoom(value)}
     value={signInRoom}
   />
  <TouchableOpacity
      style={styles.button}
      onPress={() => {handleSubmitSignin()}} >
      <Text>Valider</Text>
    </TouchableOpacity>

<Text>{listErrorsSignup}</Text></>}

<Text style={styles.textError}>{listErrorsSignin}</Text>
</View>
   
  );
}
function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      console.log('function addToken :',token)
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InscriptionScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#AADEC0",
    padding: 10,
    width: '40%' 
  },box:{
    width:'40%',
    padding:5,
    margin:3,
     borderWidth: 2,
      borderColor:'#AADEC0'
  },inner:{
      alignItems: 'center',
      justifyContent:'center'

  },text:{
    padding:5,
      alignItems: 'center',
      alignContent:'center',
      justifyContent:'center',
      margin:10,
  },onglet:{
      alignItems: "center",
      padding: 10,
      width: '50%',
      fontWeight: 'bold',
      marginBottom: 20,
      borderColor: '#AADEC0',
      borderBottomWidth: 2,
   },textLogin:{
    fontSize:18,
    fontWeight:'bold'
  },title:{
    color:'#AADEC0',
    fontSize:18,
    fontWeight:'bold'
  }, textError:{
    alignItems: 'center',
    alignContent:'center',
    justifyContent:'center',
    fontSize:18,
    color:'#AADEC0',
  },
   
});
