export class Container extends React.Component {
  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
    
    return (
      <div>
        <Map google={this.props.google} />
      </div>
    )
  }
}
export default GoogleApiComponent({
  apiKey: AIzaSyDcUxfP4uH5KBQC_to7jn1pHm2dT_Y1gQU&v=3&callback=initMap
})(Container)