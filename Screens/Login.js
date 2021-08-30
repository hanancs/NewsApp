import React, { Component, useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { storeData } from '../utils/storage';

const Login = (props) => {

    const handleLogin = (name) => {
        storeData('username', name)
        props.navigation.navigate('Home')
    }

    return (
        <Formik
            initialValues={{
                name: '',
                password: ''
            }}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
            validationSchema={yup.object().shape({
                name: yup
                    .string()
                    .required('Please, provide your name!'),
                password: yup
                    .string()
                    .min(4)
                    .max(10, 'Password should not excced 10 chars.')
                    .required(),
            })}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <ScrollView style={styles.scrollb}>

                    <View style={styles.container}>
                        <Text style={styles.title}>LOGIN PAGE</Text>
                        <Text style={styles.subtitle}>Welcome Back.</Text>
                    </View>

                    <View style={styles.container2}>
                        <TextInput
                            style={styles.tinput}
                            placeholder="Username"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                        />
                        {touched.name && errors.name &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
                        }
                    </View>
                    <View style={styles.container2}>
                        <TextInput
                            style={styles.tinput}
                            placeholder="Password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            onBlur={() => setFieldTouched('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                        }
                    </View>

                    <View style={styles.container3}>
                        <TouchableHighlight
                            style={{
                                borderRadius: 10,
                            }}
                            >
                            <Button
                                title="Login"
                                borderRadius={25}
                                containerViewStyle={{ borderRadius: 25 }}
                                buttonStyle={{ width: 145, height: 45, borderRadius: 25 }}
                                accessibilityLabel="Learn more about this button"
                                onPress={() => handleLogin(values.name)}
                                disabled={!isValid}

                            />
                        </TouchableHighlight>
                        {/* <TouchableOpacity
                            style={styles.button} 
                            onPress={() => alert('Sign In'),() => handleLogin(values.name)}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity> */}
                    </View>

                </ScrollView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#61dafb",
    },
    container2: {
        flex: 1,
        paddingTop: 14,
        paddingHorizontal: 24,
        backgroundColor: "#61dafb",
    },
    container3: {
        flex: 1,
        paddingTop: 284,
        paddingHorizontal: 34,
        backgroundColor: "#61dafb",
        borderRadius: 40,
    },
    title: {
        marginTop: 16,
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "white",
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold",
    },
    subtitle: {
        borderRadius: 6,
        paddingLeft: 33,
        backgroundColor: "#61dafb",
        color: "white",
        textAlign: "left",
        fontSize: 30,
        fontWeight: '400',
    },
    tinput: {
        height: 50,
        textAlign: "center",
        paddingVertical: 8,
        backgroundColor: "white",
        borderRadius: 27,
    },
    scrollb: {
        backgroundColor: "#61dafb",
    },
    button: {
        flexDirection: 'row',
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        width: 160,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#481380'
    },
    buttonText: {
        color: '#ffe2ff',
        fontSize: 24,
        marginRight: 5
    }
});

export default Login;