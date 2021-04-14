import React, { useEffect, useState } from 'react';

import { 
    View, 
    Image, 
    Text,
    ScrollView,
    StyleSheet, 
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    /**Adicionado uma estrutura de repeticação apra criar o componente de forma dinamica 
     * de acordo com os nomes das tecnologias encontrados dentro da lista techs. 
     */

    function handleExit() {
        AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>              

            <ScrollView>
                {techs.map(tech => ( 
                    <SpotList key={tech} tech={tech}/>
                )) }      
                <TouchableOpacity onPress={handleExit} style={[styles.button, styles.buttonCancel]}>
                        <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>                                 
            </ScrollView>    
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 40,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonCancel: {        
        backgroundColor: '#ccc',        
        marginTop: 20,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }    
});
