import React, { Component } from 'react';
import {
	View, StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Image
} from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';
import moment from "moment";

const deviceHeight = Dimensions.get('screen').height

class Business extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			axiosData: null
		};
	}

	componentDidMount() {
		this.goForAxios()
	}

	goForAxios = () => {
		console.log('Is it working')
		this.setState({
			loading: true,
		})
		loadingValue = true;
		axios.get("https://newsapi.org/v2/everything?q=business&apiKey=7dfdf4c9bb44442389f27ff0a8f2d7ed")
			.then(response => {
				console.log('Response', response.data)
				this.setState({
					loading: false,
					axiosData: response.data.articles
				})
			})
			.catch(error => {
				console.log(error);
			});
	}

	FlatListSeparator = () => {
		return (
			<View style={{
				height: .5,
				width: "100%",
				backgroundColor: "rgba(0,0,0,0.5)",
			}}
			/>
		);
	}

	renderItem = (data) => {

		console.log('Render Item: ', data.item);

		const item = data.item;

		return (

			<TouchableOpacity style={styles.list}>
				<View style={styles.row}>
					<View>
						<Image
							style={styles.tinyLogo}
							source={{
								uri: item.urlToImage,
							}}
						/>
					</View>

					<View style={styles.textareax}>
						<Text style={styles.baseText} numberOfLines={1}>{item.title}</Text>
						<Text style={styles.lightText} numberOfLines={2}>{item.description}</Text>
						<Text style={styles.date}> {moment(item.publishedAt).format("MMMM Do, YYYY")} </Text>
					</View>
				</View>
			</TouchableOpacity>

		)

	}

	render() {
		const { loading, axiosData } = this.state
		return (
				<View style={styles.parentContainer} >

					<FlatList
						data={axiosData}
						renderItem={this.renderItem.bind(this)}
						keyExtractor={(item, index) => index.toString()}
					/>

					{loading &&
						<View style={styles.loader}>
							<ActivityIndicator size="large" color="#0c9" />
							<Text style={{ fontSize: 16, color: 'red' }}>Loading Data...</Text>
						</View>
					}
				</View>
			
		);
	}
}

const styles = StyleSheet.create({
	parentContainer: {
		justifyContent: 'center',

	},
	container: {
		backgroundColor: "#fff"
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	list: {
		paddingVertical: 0,
		margin: 5,
		backgroundColor: "#fff"
	},
	tinyLogo: {
		width: 60,
		height: 60,
	},
	baseText: {
		fontWeight: 'bold'
	},
	date: {
		color: 'grey'
	},
	row: {
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 30
	},
	textareax: {
		padding: 5,
	}
});

export default Business;