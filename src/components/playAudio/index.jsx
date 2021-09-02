import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import PropTypes from 'prop-types'

import btnPlay from "@/static/images/btn_scan_play.svg";
import btnPause from "@/static/images/btn_scan_play.svg";
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
    componentDidMount () {
        if (this.props.autoPlay) {
            this.handlePlayAudio()
        }
    }
    componentWillUnmount() {
        const {innerAudioContext} = this.props
        innerAudioContext.offEnded()
    }

    handlePlayAudio = (value) => {
        const {innerAudioContext, audioEnd} = this.props
        const {format} = this.props
        innerAudioContext.autoplay = true
        innerAudioContext.src = require(`../../static/audio/${(this.props.id).trim()}.mp3`)
        if (audioEnd) {
            innerAudioContext.onEnded(() => audioEnd());
        }
        innerAudioContext.play()
        this.setState({
            playStatus: true
        })
    };
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id && this.props.autoPlay) {
            this.handlePlayAudio()
        }
    }

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
        const {imgWidth, playIcon, PauseIcon, isCover = true} = this.props;
        return (
            isCover ? 
            <View>
                {playStatus ?
                    <Image src={PauseIcon || btnPause} style={{
                        width: imgWidth ? `${imgWidth}` : '5vh',
                        height: imgWidth ? `${imgWidth}` : '5vh',
                        cursor: 'pointer',

                    }}
                        onClick={this.handlePlayAudioPause.bind(this)}/> :
                    <Image src={playIcon || btnPlay} style={{
                        width: imgWidth ? `${imgWidth}` : '5vh',
                        height: imgWidth ? `${imgWidth}` : '5vh',
                        cursor: 'pointer',
                    }}
                        onClick={this.handlePlayAudio.bind(this)}/>
                }
            </View>
            :
            <View></View>
            
        )
    }
}

play_audio.propTypes = {
    id: PropTypes.number,
    format: PropTypes.string,
    isCover: PropTypes.boolean
}
