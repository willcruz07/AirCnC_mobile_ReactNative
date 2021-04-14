import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View,
    Image,
    StyleSheet, 
    TextInput, 
    TouchableOpacity,  
    KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import logo from '../assets/logo.png';

/**Utilizamos o KeyboardAvoidingView no lugar da viw para utilização no IOS,
 * pois ao utilizar essa tag o teclado não vai ficar por cima dos campos eele aplica o padding na distancia
 * do teclado
 */

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    /**Verificando se usuário esta logado e direcionando direto para a pagina list de estiver.
     * Era possivel utilizar await mas utilizamos a promisse com.then
     */
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        });  
    }, []);

    async function handleSubmit() {               
        const response = await api.post('/sessions', {email});        
        
        const {_id} = response.data;   

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);        

        navigation.navigate('List');               
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={logo}/>                        

            <View style={styles.form}>
                <Text style={styles.label}> Seu Email* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}> Tecnologias* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.textButton}>Encontrar spots</Text>    
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center' 
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {        
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});