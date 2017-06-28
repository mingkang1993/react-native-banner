'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    PropTypes
} from 'react-native';

import Swiper from './Swiper';
const screenWidth = Dimensions.get('window').width;

class Banner extends React.Component {

    static propTypes: {
        banners: PropTypes.array.isRequired,
        intent: PropTypes.func,
        onMomentumScrollEnd: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.images = props.banners.map((banner) => banner.image);
        this.titles = props.banners.map((banner) => banner.title);
    }

    render() {
        let imageViews = this.images.map((image, index) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1}}
                    key={'b_image_'+index}
                    onPress={
                        () => {
                            this.props.intent && this.props.intent(index, this.banners);
                            // this.props.banners[index].intent && this.props.banners[index].intent(index);
                        }
                    }
                >
                    <Image style={styles.image} source={typeof(image) == 'string' ? {uri: image} : image} />
                </TouchableOpacity>
            );
        });

        return (
            <Swiper
              {...this.props}
              autoplay={true}
              whRatio={1.9}
              dotStyle={{width: 14, height: 2.5, backgroundColor:'rgba(255,255,255,.9)'}}
              activeDotStyle={{width: 14, height: 2.5, backgroundColor:'#ed3a4a'}}
              renderTitle={
                  (index, view) => {}

              }
              paginationStyle={{
                    bottom: 7, left: 0, right: 0
              }}
              loop={true}
            >
                {imageViews}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    titleView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        height: 35,
        width: screenWidth,
    },
    titleStyle: {
        color: 'white',
        marginRight: 100,
        marginLeft: 10,
    },
    image: {
        flex: 1,
    },
});

module.exports = Banner;
