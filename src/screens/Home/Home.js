import React, { Component } from 'react';
import styles from '../../components/common/styles';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { COLOR } from '../../components/common/color';
import { categories, ingredients } from '../../service/dataArrays';
import { FAB } from 'react-native-paper';

const { width, height } = Dimensions.get("screen")

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            imgDate: [
                "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
                "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=785&q=80",
                "https://images.unsplash.com/photo-1521235059770-7848f54dc79e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
                "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            ]
        };
        this.carousel = this.carousel.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.onAnnotationEnd = this.onAnnotationEnd.bind(this)
    }
    componentDidMount() {
        this.carousel()
    }

    dotClick(index) {
        clearInterval(this.carouselTimer);
        this.setState({
            currentIndex: index
        }, () => {
            var ScrollView = this.refs.scrollView;
            const currentX = this.state.currentIndex * Dimensions.get('window').width;
            ScrollView.scrollResponderScrollTo({ x: currentX, animated: true })
        })
    }

    dragStart() {
        clearInterval(this.carouselTimer);
    }

    dragEnd() {
        this.carousel()
    }

    //timer
    carousel() {
        var ScrollView = this.refs.scrollView;
        const timer = 4000;
        let currentIndex = this.state.currentIndex;

        this.carouselTimer = setInterval(() => {
            currentIndex === this.state.imgDate.length - 1 ? currentIndex = 0 : currentIndex++
            this.setState({
                currentIndex: currentIndex
            }, () => {
                const currentX = currentIndex * Dimensions.get('window').width;
                ScrollView.scrollResponderScrollTo({ x: currentX, animated: true })
            })
        }, timer)

    }

    onAnnotationEnd(e) {
        const offSetX = e.nativeEvent.contentOffset.x;
        const currentIndex = offSetX / Dimensions.get('window').width;
        this.setState({
            currentIndex: currentIndex
        })
    }

    goDetailProduk = (item) => {
        this.props.navigation.navigate('detailProduk', {
            data: item
        })
    }


    render() {
        const { imgDate, currentIndex } = this.state;
        const screenWidth = Dimensions.get('window').width;
        const imgDataList = imgDate.map((elem, index) => {
            return (
                <Image key={index} style={{ width: screenWidth, height: 240 }} source={{ uri: elem }} />
            )
        });
        const dotList = imgDate.map((elem, index) => {
            return (
                <Text onPress={this.dotClick.bind(this, index)} key={index} style={[styles.dotStyle, { backgroundColor: currentIndex === index ? COLOR.secondary_color : "#fff" }]}></Text>
            )
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <ScrollView
                            ref="scrollView"
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            onScrollBeginDrag={this.dragStart}
                            onScrollEndDrag={this.dragEnd}
                            onMomentumScrollEnd={this.onAnnotationEnd}
                        >
                            {imgDataList}
                        </ScrollView>
                        <View style={{ ...styles.dotView }}>{dotList}</View>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 15, marginTop: 15 }}>
                        Popular Coffe
                    </Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal>
                        {
                            categories.map((item, key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.cardhomepopular}>
                                    <Image
                                        style={styles.cardhomeimage}
                                        source={{ uri: item.photo_url }}
                                    />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.harga}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                    <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 15, marginTop: 15 }}>
                        Popular Menu
                    </Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal>
                        {
                            ingredients.map((item, key) => (
                                <TouchableOpacity
                                    onPress={() => this.goDetailProduk(item)}
                                    key={key}
                                    style={styles.cardhomepopular}>
                                    <Image
                                        style={styles.cardhomeimage}
                                        source={{ uri: item.photo_url }}
                                    />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.harga}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                    {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 15 }}>
                        Popular Menu
                    </Text>
                    <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
                        {
                            ingredients.map((item, key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={{
                                        width: width - 30, padding: 5, flexDirection: "row",
                                        justifyContent: "space-between", marginVertical: 5,
                                        shadowColor: "#000", backgroundColor: COLOR.white,
                                        textShadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                        elevation: 5,
                                    }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image
                                            style={{ width: width / 5, height: width / 5 }}
                                            source={{ uri: item.photo_url }} />
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                                            <Text>Harga</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            ))
                        }
                    </View> */}
                </ScrollView>
                <FAB
                    onPress={() => this.props.navigation.navigate("keranjang")}
                    icon="shopping"
                    color={COLOR.white}
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLOR.primary_color
                    }}
                />
            </View>
        )
    }
}

export default Home