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

import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo, useEffect, useState } from '@wordpress/element';
import { useBlockProps, InnerBlocks, InspectorControls} from '@wordpress/block-editor';
import { Panel, PanelRow, PanelBody, SelectControl, TextControl, ToggleControl, ColorPicker} from '@wordpress/components';

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
export default function Edit({
	clientId,
	attributes,
	setAttributes,
	context: { postId, postType: postTypeSlug, queryId },
}) {

	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const [ temporaryURL, setTemporaryURL ] = useState();

	const [ storedFeaturedImage, setFeaturedImage ] = useEntityProp(
		'postType',
		postTypeSlug,
		'featured_media',
		postId
	);

	const [ postContent ] = useEntityProp(
		'postType',
		postTypeSlug,
		'content',
		postId
	);

	const featuredImage = useMemo( () => {
		if ( storedFeaturedImage ) {
			return storedFeaturedImage;
		}

		const imageOpener =
			/<!--\s+wp:(?:core\/)?image\s+(?<attrs>{(?:(?:[^}]+|}+(?=})|(?!}\s+\/?-->).)*)?}\s+)?-->/.exec(
				postContent
			);
		const imageId =
			imageOpener?.groups?.attrs &&
			JSON.parse( imageOpener.groups.attrs )?.id;
		return imageId;
	}, [ storedFeaturedImage, postContent ] );

	const { media, postType, postPermalink } = useSelect(
		( select ) => {
			const { getMedia, getPostType, getEditedEntityRecord } =
				select( coreStore );
			return {
				media:
					featuredImage &&
					getMedia( featuredImage, {
						context: 'view',
					} ),
				postType: postTypeSlug && getPostType( postTypeSlug ),
				postPermalink: getEditedEntityRecord(
					'postType',
					postTypeSlug,
					postId
				)?.link,
			};
		},
		[ featuredImage, postTypeSlug, postId ]
	);

	const mediaUrl =
		media?.media_details?.sizes?.[ "large" ]?.source_url ||
		media?.source_url;

	setAttributes({backgroundImage:mediaUrl})

	const blockStyles = {
		backgroundImage:`url('${mediaUrl}')`
	}
	

	const blockProps = useBlockProps(
		attributes.useFeaturedImage ? {style:blockStyles} : {}
	)

	return (
		<div { ...blockProps}>
			<InspectorControls>
				<Panel header="Controls" initialOpen={ false }>
					<PanelBody title="Featured Background">
						<ToggleControl
							label="use post featured image as background"
							checked={attributes.useFeaturedImage}
							onChange={ (newUseFeaturedImage) => setAttributes({useFeaturedImage:newUseFeaturedImage}) }
						/>
					</PanelBody>
					<PanelBody title="Linking" initialOpen={ false }>
						<SelectControl
							label="linking"
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
					</PanelBody>
					<PanelBody title="crosshairs" initialOpen={ false }>
						<SelectControl
								label="Positioning"
								value={attributes.positioning}
								options={[
									{label:'local', value:'is-local'},
									{label:'global', value:'is-global'}
								]}
								onChange={ (newPositioning) => setAttributes({positioning:newPositioning}) }
							/>
							<ColorPicker
								label="Cell Border Color"
								color={attributes.borderColor}
								onChange={(newBorderColor) => setAttributes({borderColor:newBorderColor})}
							/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div class="wp-block-spc-btn-inner-container">
			<InnerBlocks/>
			</div>
		</div>
	);
}
