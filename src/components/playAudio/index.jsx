import Taro from '@tarojs/taro'
import {Text, Image} from '@tarojs/components'
import PropTypes from 'prop-types'

import btnPlay from "@/static/images/btn_learn_play.svg";
import btnPause from "@/static/images/btn_learn_play.svg";
export default class play_audio extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            playStatus: false
        };
        const self = this;
        const {innerAudioContext} = this.props
        innerAudioContext.onEnded(function () {
            self.handlePause()
        });
    };

    componentDidShow() {

    }

    componentWillUnmount() {
        const {innerAudioContext} = this.props
        innerAudioContext.offEnded()
    }

    handlePlayAudio = (value) => {
        const {innerAudioContext} = this.props
        const {format} = this.props
        innerAudioContext.autoplay = true
        innerAudioContext.src = require(`../../static/audio/${this.props.id}.mp3`)
        // innerAudioContext.onEnded(() => this.audioEnd());
        innerAudioContext.play()
        this.setState({
            playStatus: true
        })
    };


    handlePlayAudioPause = (value) => {
        const {innerAudioContext} = this.props
        innerAudioContext.pause()
        this.setState({
            playStatus: false
        })
    };

    handlePause() {
        const {innerAudioContext} = this.props
        this.setState({
            playStatus: false
        })
        innerAudioContext.offEnded()
    }

    render() {
        const {playStatus} = this.state;
        const {imgWidth} = this.props;
        return (
            <Text>
                {playStatus ?
                    <Image src={btnPause} style={{
                        width: imgWidth ? `${imgWidth}px` : '2.22vw',
                        height: imgWidth ? `${imgWidth}px` : '5vh',
                        cursor: 'pointer',

                    }}
                        onClick={this.handlePlayAudioPause.bind(this)}/> :
                    <Image src={btnPlay} style={{
                        width: imgWidth ? `${imgWidth}px` : '2.22vw',
                        height: imgWidth ? `${imgWidth}px` : '5vh',
                        cursor: 'pointer',
                    }}
                        onClick={this.handlePlayAudio.bind(this)}/>
                }
            </Text>
        )
    }
}

play_audio.propTypes = {
    id: PropTypes.number,
    format: PropTypes.string
}
