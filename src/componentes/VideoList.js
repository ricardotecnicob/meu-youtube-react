import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Image, Dimmer, Loader } from 'semantic-ui-react' 

import {reproduzVideo} from '../store/actions/reproduz-video'
import { dispatch } from 'rxjs/internal/observable/range';

class VideoList extends Component {

    renderVideo(video){
        return (
            
                <List animated verticalAlign='middle' key={video.etag}  >
    
                    <List.Item onClick={() => this.props.reproduz(video)} >
                        <Image src={video.snippet.thumbnails.default.url} /> 
                        <List.Content>
                            <List.Header>
                                {video.snippet.title}
                            </List.Header>
                        </List.Content> 
                    </List.Item>  
    
                </List>    
   
        )
    }

    render(){
        return (
            <div className='video-list'>

                {
                    this.props.carregando && (<Dimmer active >
                        <Loader size="medium">Carregando...</Loader>
                    </Dimmer>)
                }

                {
                    this.props.videos.map(video => {
                        console.log("meu video ", video)
                        return this.renderVideo(video)
                    })
                }

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reproduz: (video) => dispatch(reproduzVideo(video))
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.busca.videos,
        carregando: state.busca.carregando,
        erro: state.busca.erro
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(VideoList)