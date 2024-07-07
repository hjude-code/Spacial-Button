/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls} from '@wordpress/block-editor';
import { PanelRow, PanelBody, SelectControl, TextControl, ColorPicker} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const blockProps = useBlockProps({
		className:'testing'
	})

	return (
		<div { ...blockProps}>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label="Link to"
						value={attributes.linkTo}
						options={[
							{label:'post', value:'post'},
							{label:'custom', value:'custom'}
						]}
						onChange={ (newLinkTo) => setAttributes({linkTo:newLinkTo}) }
					/>
					<TextControl
						label="Custom Link"
						value={attributes.customLink}
						onChange={(newCustomLink) => setAttributes({customLink:newCustomLink})}
					/>
					<ColorPicker
						label="Cell Border Color"
						color={attributes.borderColor}
						onChange={(newBorderColor) => setAttributes({borderColor:newBorderColor})}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="wp-block-spc-btn-inner-container">
			<InnerBlocks/>
			</div>
		</div>
	);
}
