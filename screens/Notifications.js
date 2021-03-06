import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // console.log("global state", GlobalState.cache)
    this.state = {
      requests: [],
      // request_photos: [],
    };
    fetch(`http://localhost:3000/requests/advise`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {return response.json()})
    .then((responseJson) => {
      this.setState({
        requests: responseJson,
      })
    })
    .done()
  }


  renderRequests() {
    var self = this
    return this.state.requests.map( (request) => {
      return (
        <View>
        <View style={styles.viewContainer}>
          <Text key={request.id} style={styles.description}>
            {request.user.username}: {request.description}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Image key={request.id}
          style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
            source={{uri:`http:${request.request_photos[0].image}`}}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button key={request.id}
            onPress={() => {self._submitButton(request)} }
            title="Give Advice"
            color="#000"
          />
         </View>
         </View>
        )
    } )
  }

   render() {
     return (
       <View style={styles.container}>
        <ScrollView>
        <Text style={styles.title}>
          Notifications
        </Text>

        {this.renderRequests()}

        </ScrollView>
      </View>
    );
  }

   _submitButton = (request) => {
    this.props.navigator.push("comment", { request: request })
  };

}

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
  },
  title: {
    padding: 10,
    fontSize: 22,
    marginBottom: 15,
    backgroundColor: COLOR_BEIGE,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  link: {
    padding: 10,
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center',
    width: '100%',
  },
})

