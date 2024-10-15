import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input
  const [locationModalVisible, setLocationModalVisible] = useState(false); // State for managing location modal
  const [currentLocation, setCurrentLocation] = useState('New York, USA'); // State for current location
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage authentication
  const [authModalVisible, setAuthModalVisible] = useState(false); // State for showing sign-in/sign-out modal
  const [username, setUsername] = useState(''); // Username input for signing in

  // Sample data for popular items
  const popularItems = [
    { id: '1', title: 'Cheese Pizza', price: '$8.99', distance: '2 km', rating: '4.7', imageUri: require('./assets/Pizza-3007395.jpg') },
    { id: '2', title: 'Burger Snack', price: '$6.99', distance: '1.5 km', rating: '4.5', imageUri: require('./assets/burger.png') },
    { id: '3', title: 'North Indian', price: '$9.99', distance: '1.5 km', rating: '4.5', imageUri: require('./assets/maxresdefault.jpg') },
    { id: '4', title: 'South Indian', price: '$9.99', distance: '1.5 km', rating: '4.5', imageUri: require('./assets/southindian.jpg') },
    { id: '5', title: 'KFC', price: '$9.99', distance: '1.5 km', rating: '4.5', imageUri: require('./assets/kfc.jpg') }
  ];

  // Filter popular items based on search query
  const filteredItems = popularItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Handle sign-in/sign-out logic
  const handleSignIn = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
      setAuthModalVisible(false);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername('');
    setAuthModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
            <Text style={styles.locationText}>
              <Ionicons name="location-outline" size={18} color="#000" /> Deliver to
            </Text>
            <Text style={styles.locationCity}>{currentLocation}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setAuthModalVisible(true)}>
          <Image style={styles.profileIcon} source={require('./assets/login.png')} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or foods"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} // Update the search query
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <Image
          style={{ width: '100%', height: 100, resizeMode: 'cover' }} 
          source={require('./assets/chicken.png')}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        <CategoryCard title="Burger" imageUri={require('./assets/burger.png')} bgColor="#FDE7E0" />
        <CategoryCard title="Pizza" imageUri={require('./assets/Pizza-3007395.jpg')} bgColor="#E7F1FD" />
        <CategoryCard title="Snacks" imageUri={require('./assets/snacks.png')} bgColor="#FFF5D0" />
        <CategoryCard title="Noodles" imageUri={require('./assets/noodles.webp')} bgColor="#FFE5F2" />
        <CategoryCard title="Samosa" imageUri={require('./assets/samosa.jpg')} bgColor="#E0FFE7" />
      </ScrollView>

      {/* Popular Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.popularContainer}>
        {/* Rendering filtered items based on the search */}
        {filteredItems.map(item => (
          <PopularCard 
            key={item.id}
            title={item.title}
            price={item.price}
            distance={item.distance}
            rating={item.rating}
            imageUri={item.imageUri} 
          />
        ))}
      </View>

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Location</Text>
          {/* Add a few locations to choose from */}
          <TouchableOpacity onPress={() => { setCurrentLocation('New York, USA'); setLocationModalVisible(false); }}>
            <Text style={styles.modalItem}>New York, USA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurrentLocation('San Francisco, USA'); setLocationModalVisible(false); }}>
            <Text style={styles.modalItem}>San Francisco, USA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurrentLocation('Chicago, USA'); setLocationModalVisible(false); }}>
            <Text style={styles.modalItem}>Chicago, USA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Authentication Modal */}
      <Modal
        visible={authModalVisible}
        animationType="slide"
        onRequestClose={() => setAuthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isLoggedIn ? 'Sign Out' : 'Sign In'}</Text>
          {isLoggedIn ? (
            <>
              <Text style={styles.modalItem}>Welcome, {username}</Text>
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.modalItem}>Sign Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.modalItem}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => setAuthModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

// CategoryCard and PopularCard components remain unchanged

const CategoryCard = ({ title, imageUri, bgColor }) => {
  const isRemote = typeof imageUri === 'string';
  return (
    <View style={[styles.categoryCard, { backgroundColor: bgColor }]}>
      <Image style={styles.categoryImage} source={isRemote ? { uri: imageUri } : imageUri} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </View>
  );
};

const PopularCard = ({ title, price, distance, rating, imageUri }) => {
  const isRemote = typeof imageUri === 'string';
  return (
    <View style={styles.popularCard}>
      <Image style={styles.popularImage} source={isRemote ? { uri: imageUri } : imageUri} />
      <View style={styles.popularDetails}>
        <Text style={styles.popularTitle}>{title}</Text>
        <Text style={styles.popularDistance}>{distance}</Text>
        <Text style={styles.popularPrice}>{price}</Text>
        <Text style={styles.popularRating}>⭐ {rating}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Aligns items vertically in the center
    paddingHorizontal: 20,
    paddingVertical: 10, // Adds vertical padding
    backgroundColor: '#fff', // Optional: adds background color
    elevation: 2, // Optional: adds shadow for Android
    shadowColor: '#000', // Optional: shadow for iOS
    shadowOpacity: 0.1, // Optional: shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: shadow for iOS
    shadowRadius: 4, // Optional: shadow for iOS
  },
  locationContainer: {
    flexDirection: 'column', // Aligns texts vertically
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  locationCity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5, // Adds space between location text and city
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the profile icon circular
  },
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  locationText: { fontSize: 14, color: '#888' },
  locationCity: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  profileIcon: { width: 40, height: 40, borderRadius: 20 },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20 },
  searchInput: { flex: 1, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginRight: 10 },
  filterButton: { backgroundColor: '#FF6347', padding: 10, borderRadius: 10 },
  promoBanner: { marginHorizontal: 20, marginTop: 20, borderRadius: 10, overflow: 'hidden' },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { fontSize: 14, color: '#FF6347' },
  categoriesScroll: { flexDirection: 'row', paddingLeft: 20, marginTop: 10 },
  categoryCard: { alignItems: 'center', marginRight: 20 },
  categoryImage: { width: 60, height: 60, borderRadius: 30 },
  categoryTitle: { marginTop: 10, fontSize: 14, fontWeight: '600' },
  popularContainer: { paddingHorizontal: 20, marginTop: 20, marginBottom: 45 },
  popularCard: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' },
  popularImage: { width: 100, height: 100, resizeMode: 'cover' },
  popularDetails: { flex: 1, padding: 10 },
  popularTitle: { fontSize: 16, fontWeight: 'bold' },
  popularDistance: { fontSize: 14, color: '#888' },
  popularPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF6347' },
  popularRating: { fontSize: 14, color: '#FFD700', marginTop: 5 },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalCloseButton: {
    fontSize: 16,
    color: '#FF6347',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    width: '80%',
    textAlign: 'center',
    color: '#333',
  },
  modalInput: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  modalCloseButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347', // Tomato color for visibility
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF', // Blue background
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

