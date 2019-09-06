import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ navigation }) {
  const id = navigation.getParam('user')
  const [users, setUsers] = useState([]);
  const [itsMatch, setItsMatch] = useState(null);

  useEffect(() => {
    async function loadUsers () {
      const response = await api.get('/developers', {
        headers: {
          user: id
        }
      })
      console.log(response.data)
      setUsers(response.data)
    }

    loadUsers()
  }, [id])

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: {
        user: id
      }
    });

    socket.on('match', developer => {
      setItsMatch(developer);
    })
  }, [id])

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/developers/${user._id}/likes`, null, {
      headers: {
        user: id
      }
    })

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/developers/${user._id}/dislikes`, null, {
      headers: {
        user: id
      }
    })

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo}/>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        { users.length ? (
          users.map((user, index) => (
            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
              <Image style={styles.avatar} source={{ uri: user.avatar }}/>
              <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>Acabou :(</Text>
        )}
      </View>

      { users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}

      { itsMatch && (
        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsamatch}/>
          <Image style={styles.matchAvatar} source={{ uri: itsMatch.avatar }} />
          <Text style={styles.matchName}>{itsMatch.name}</Text>
          <Text style={styles.matchBio}>{itsMatch.bio}</Text>

          <TouchableOpacity onPress={() => setItsMatch(null)} style={styles.matchButton}>
            <Text style={styles.matchButtonText}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 30
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold'
  },
  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  avatar: {
    flex: 1,
    height: 300
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    zIndex: 0
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 999
  },
  matchAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#FFF',
    marginVertical: 30
  },
  matchName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF'
  },
  matchBio: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 30
  },
  matchButton: {
    marginTop: 30
  },
  matchButtonText: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center'
  },
  matchImage: {
    height: 60,
    resizeMode: 'contain'
  }
})