import React from 'react'
import api from '../../API/imagesAPI'
import Modal from '../Modal/Modal'

class PageImages extends React.Component {
	state = {
		images: [],
		open: false,
		bigImage: null,
		comments: [],
		smallDevice: false,
	}

	mediaChanges = () => {
		const mediaQueryList = window.matchMedia("(max-width: 600px)")
		return mediaQueryList.matches
	}

	updateDimensions = () => {
		this.setState({ smallDevice: this.mediaChanges })
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions)
	}

	componentDidMount = async () => {
		window.addEventListener("resize", this.updateDimensions)

		try {
			const images = await api.getImages()
			this.setState({
				images: images,
			})
		} catch (error) {
			console.error(error)
		}
	}

	handleClickImage = async (image) => {
		try {
			const bigImage = await api.getImage(image)
			this.setState({
				comments: bigImage.comments,
				open: true,
				bigImage: bigImage,
			})
		} catch (error) {
			console.error(error)
		}
	}

	renderImages = () => {
		return this.state.images.map((image) => {
			return (
				<div key={image.id}>
					<img
						src={image.url}
						className="image"
						onClick={() => this.handleClickImage(image.id)}
					/>
				</div>
			)
		})
	}

	handleCloseModal = () => {
		this.setState({
			open: false,
		})
	}

	render() {
		if (this.state.smallDevice || this.mediaChanges()) {
			if (this.state.open) {
				return (
					<Modal
						api={api}
						onClose={this.handleCloseModal}
						show={this.state.open}
						bigImage={this.state.bigImage}
						comments={this.state.comments}
					/>
				)
			} else {
				return <div className="block-images">{this.renderImages()}</div>
			}
		} else {
			return (
				<>
					<div className="block-images">{this.renderImages()}</div>
					<Modal
						api={api}
						onClose={this.handleCloseModal}
						show={this.state.open}
						bigImage={this.state.bigImage}
						comments={this.state.comments}
					/>
				</>
			)
		}
	}
}

export default PageImages