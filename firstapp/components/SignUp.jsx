import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';

const SignUp = (props) => {
    const [data, setData] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const urlSignUp = "https://fpoly-hcm.herokuapp.com/api/users/register";

    const checkingStatusCode = (statusCode, data) => {
        if (statusCode == 200) {
            Alert.alert("Signed up successfully!!!")
        } else {
            Alert.alert("Error, check your info again!!!")
        }
    }

    const handleSignIn = async () => {
        console.log(email, password);
        const data = {
            "email": email,
            "password": password
        }
        await axios.post(urlSignUp, data, {}).then((res) => {
            console.log(res.data);
            setData(res.data);
            checkingStatusCode(res.data.statusCode, res.data)
        })
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleForgotPassword = () => {
        // Xử lý khi người dùng nhấn vào "Forgot Password?"
        console.log('Forgot Password?');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../image/logo.png')} />
            <View style={styles.inputContainer}>
                <Image style={styles.icon} source={require('../image/email.png')} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <Image style={styles.icon} source={require('../image/password.png')} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.rememberMe} onPress={toggleRememberMe}>
                    <Text style={styles.rememberMeText}>{rememberMe ? '✔' : '◯'}</Text>
                    <Text>Remember Me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} >
                <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 300,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50, // Chỉnh sửa marginBottom ở đây
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 10,
        // marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#1877F2',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        height: 50
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    rememberMe: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 10
    },
    rememberMeText: {
        fontSize: 20,
        marginRight: 8,
    },
    forgotPassword: {
        height: 40, // Đây là chiều cao bạn có thể thay đổi
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 10
    },
    forgotPasswordText: {
        textDecorationLine: 'underline', // Để làm nổi bật, bạn cũng có thể sử dụng kiểu underline
    },
});

export default SignUp;
