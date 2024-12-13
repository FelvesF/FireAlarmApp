import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, Pressable, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    { 
      name: 'Kenneth Mago', 
      role: 'Project Manager', 
      description: 'Responsible for overall project coordination and delivery. Their main job is to make sure the project is completed on time, within budget, and meets the goals.',
      image: require('../assets/images/kenneth.jpg'), // Add the specific image for this member
    },
    { 
      name: 'Mary Jean Dayandayan', 
      role: 'UI/UX Manager', 
      description: 'Leads the design team to create intuitive and engaging user interfaces.',
      image: require('../assets/images/dayandayan.jpg'),
    },
    { 
      name: 'Felves Flores', 
      role: 'BackEnd Developer', 
      description: 'Handles server-side logic and database management.',
      image: require('../assets/images/flores.jpg'),
    },
    { 
      name: 'Ron Bayson', 
      role: 'FrontEnd Developer', 
      description: 'Develops the user interface and ensures a smooth user experience.',
         image: require('../assets/images/ron.jpg'),
    },
    { 
    name: 'Nathaniel Neo Esquillo', 
      role: 'Database Administrator', 
      description: 'Manages and maintains the database to ensure its integrity and security.',
      image: require('../assets/images/neo.jpg'),   
    },
    { 
      name: 'Jesselle Anne Aquino', 
      role: 'Assurance Specialist', 
      description: 'They plan, schedule, and coordinate the release to make sure everything is tested and works properly before it goes live.',
      image: require('../assets/images/jesselle.png'),
    },
    { 
      name: 'Jay Nicoll Jolo', 
      role: 'Release Manager', 
      description: 'Manages the release process, ensuring smooth deployment and updates.',
      image: require('../assets/images/jolo.jpg'),
    },
    { 
      name: 'Ma Donna Mae Javier', 
      role: 'User Insight Specialist', 
      description: 'Collects and analyzes user feedback to improve the app.',
      image: require('../assets/images/javier.jpg'),
    },
  ];

  const handlePress = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMember(null);
  };

  return (
     <SafeAreaView style={styles.safe}>
           <StatusBar
        backgroundColor="rgba(80, 26, 33, 1)"
        barStyle="light-content"
      />
        <Header title='ABOUT US'/>
    <View style={styles.container}>
      

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.p1}>
          <Text style={styles.t1}>
          Light Ease is a user-friendly mobile application designed to provide effortless control 
          over your home lighting. With a focus on simplicity and reliability, Light Ease allows you to
           seamlessly control your smart bulb from anywhere, ensuring your home is always lit just the 
           way you want it. The app features remote control capabilities, enabling you to turn your lights 
           on and off with a tap on your mobile device. Additionally, it sends notifications to ensure your
            lights are turned off when they should be, saving energy and giving you peace of mind. 
            Experience the ease of managing your home lighting with Light Ease—the perfect app for
             ensuring your lights are always under your control.

          </Text>
        </View>

        <View style={styles.meet}>
          <Text style={styles.teams}>MEET THE TEAM</Text>

          {/* Team Members */}
          <View style={styles.teamContainer}>
            {teamMembers.map((member, index) => (
              <Pressable key={index} onPress={() => handlePress(member)} style={styles.imageWrapper}>
                <Image source={member.image} style={styles.images} />
                <Text style={styles.imageText}>{member.name}</Text>
                <Text style={styles.imageText1}>{member.role}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      {selectedMember && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Image source={selectedMember.image} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedMember.name}</Text>
              <Text style={styles.modalRole}>{selectedMember.role}</Text>
              <Text style={styles.modalDescription}>{selectedMember.description}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCloseModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#800000',
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  p1: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  t1: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  meet: {
    marginTop: 20,
  },
  teams: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'maroon',
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    alignItems: 'center',
    flexBasis: '45%',
    marginBottom: 20,
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageText1: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalRole: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#800000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



