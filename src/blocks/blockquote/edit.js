// Import block dependencies and components.
import classnames from "classnames"

// Import icon.
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
//import styling from "./styling"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaUpload,
} = wp.editor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	BaseControl,
	ToggleControl
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

class UAGBBlockQuote extends Component {

	render() {

		const { isSelected, className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props

		// Setup the attributes.
		const {
			block_id,
			skinStyle,
			align,	
			description_text,
			author,		
			authorColor,
			descColor,
			enableTweet,
			tweetBtnColor,
			tweetBtnHoverColor,
			descFontSize,
			authorFontSize,
			tweetBtnFontSize,	
			descSpace,
			authorSpace,	
			stack
		} = attributes

		// Add CSS.
		var element = document.getElementById( "uagb-blockquote-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
	
		return (
			<Fragment>				
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __( "Skin" ) }
					>
						<SelectControl
									label={ __( "Style" ) }
									options={[
										{ value: "border", label: __( "Border" ) },
										{ value: "quotation", label: __( "Quotation" ) },
										{ value: "clean", label: __( "Clean" ) }
									] }
									value={ skinStyle }
									onChange={ ( value ) => setAttributes( { skinStyle: value } ) }
								/>
					</PanelBody>
					<PanelBody title={ __( "Social Icon" ) }
						initialOpen={ false }>
						<ToggleControl
							label={ __( "Enable Twitter Icon" ) }
							checked={ enableTweet }
							onChange={ ( value ) => setAttributes( { enableTweet: ! enableTweet } ) }
						/>						
					</PanelBody>
					<PanelBody
						title={ __( "Typography" ) }
						initialOpen={ false }>						
						<RangeControl
							label={ __( "Content Font Size" ) }
							value={ descFontSize }
							onChange={ ( value ) => setAttributes( { descFontSize: value } ) }
							min={ 1 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={30}
						/>
						<RangeControl
							label={ __( "Author Font Size" ) }
							value={ authorFontSize }
							onChange={ ( value ) => setAttributes( { authorFontSize: value } ) }
							min={ 1 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={16}
						/>
						<RangeControl
							label={ __( "Tweet Font Size" ) }
							value={ tweetBtnFontSize }
							onChange={ ( value ) => setAttributes( { tweetBtnFontSize: value } ) }
							min={ 1 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={16}
						/>						
					</PanelBody>
					<PanelColorSettings
						title={ __( "Color Settings" ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: descColor,
								onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
								label: __( "Content Color" ),
							},
							{
								value: authorColor,
								onChange: ( colorValue ) => setAttributes( { authorColor: colorValue } ),
								label: __( "Author" ),
							},
							{
								value: tweetBtnColor,
								onChange: ( colorValue ) => setAttributes( { tweetBtnColor: colorValue } ),
								label: __( "Tweet Button Color" ),
							},							
							{
								value: tweetBtnHoverColor,
								onChange: ( colorValue ) => setAttributes( { tweetBtnHoverColor: colorValue } ),
								label: __( "Tweet Button Hover" ),
							},
						] }
					>
					</PanelColorSettings>

					<PanelBody
						title={ __( "Spacing" ) }
						initialOpen={ false }>
						<RangeControl
							label={ __( "Author Bottom Spacing" ) }
							value={ authorSpace }
							onChange={ ( value ) => setAttributes( { authorSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
							initialPosition={0}
						/>
						<RangeControl
							label={ __( "Description Bottom Spacing" ) }
							value={ descSpace }
							onChange={ ( value ) => setAttributes( { descSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
							initialPosition={0}
						/>			
						
					</PanelBody>
				</InspectorControls>
				<div
					className = { classnames(
						className,
						"uagb-blockquote",
						"uagb-quote__outer-wrap",
					) }
					id={ `uagb-quote-${ this.props.clientId }` }>
					<div className = "uagb-quote__wrap">
						<blockquote className="uagb-blockquote">					  
						   	<RichText
								tagName="p"
								placeholder={ __( "Write Content" ) }
								value={ description_text }
								className='uagb-blockquote__content'
								multiline={ false }
								onChange={ ( value ) => {
									setAttributes( { description_text: value } ) }
								}
								onMerge={ mergeBlocks }
								unstableOnSplit={
									insertBlocksAfter ?
										( before, after, ...blocks ) => {
											setAttributes( { content: before } )
											insertBlocksAfter( [
												...blocks,
												createBlock( "core/paragraph", { content: after } ),
											] )
										} :
										undefined
								}
								onRemove={ () => onReplace( [] ) }
							/>
					   <footer>

					      <RichText
								tagName="cite"
								placeholder={ __( "Write Content" ) }
								value={ author }
								className='uagb-blockquote__author'
								multiline={ false }
								onChange={ ( value ) => {
									setAttributes( { author: value } ) }
								}
								onMerge={ mergeBlocks }
								unstableOnSplit={
									insertBlocksAfter ?
										( before, after, ...blocks ) => {
											setAttributes( { content: before } )
											insertBlocksAfter( [
												...blocks,
												createBlock( "core/paragraph", { content: after } ),
											] )
										} :
										undefined
								}
								onRemove={ () => onReplace( [] ) }
							/>
					      <a href="javascript:void(0)" className="uagb-blockquote__tweet-button" target="_blank">
					      	<i className="fa fa-twitter"></i>
					      	<span className="uagb-blockquote__tweet-label">Twitter</span>
					      </a>
					   </footer>
					</blockquote>
					</div>
				</div>
			</Fragment>
		)
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-blockquote-style-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default UAGBBlockQuote
