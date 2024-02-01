import React from 'react';
import { View, Text, Image, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingData = [
    { id: '1', name: 'Theme', icon: 'cog' },
    { id: '2', name: 'Help & Support', icon: 'support' },
    { id: '3', name: 'University Website', icon: 'cog' },
    { id: '4', name: 'Frequently Asked Questions', icon: 'cog' },
    { id: '5', name: 'Privacy Policy', icon: 'cog' },
    { id: '6', name: 'About App', icon: 'apple' },
    { id: '7', name: 'Log Out', icon: 'cog' },
];

const UserSettings = () => {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardContainer}>
                <View style={styles.cardInnerContainer}>
                    <Icon name={item.icon} color="#fff" size={26} />
                    <Text style={styles.cardText}>{item.name}</Text>
                </View>
                <Icon name="chevron-right" color="#fff" size={20} />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../assets/star.png')}
                    alt="profile"
                />
                <View style={styles.userDeatilContainer}>
                    <Text style={styles.profileName}>Astha Shrestha</Text>
                    <Text style={styles.infoText}>See your profile</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <FlatList
                data={SettingData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default UserSettings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#808080',
    },
    profileContainer: {
        flexDirection: 'row',
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#a9a9a9',
        marginVertical: 10,
        padding: 14,
        alignItems: 'center',
        borderRadius: 16,
    },
    cardInnerContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        marginLeft: 16,
    },
    profileImage: {
        width: 70,
        height: 70,
    },
    userDeatilContainer: {
        marginLeft: 18,
    },
    profileName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 4,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#fff',
        marginTop: 18,
    },
});