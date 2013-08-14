<?php
/**
 * @file
 * stf_wysiwyg.features.wysiwyg.inc
 */

/**
 * Implements hook_wysiwyg_default_profiles().
 */
function stf_wysiwyg_wysiwyg_default_profiles() {
  $profiles = array();

  // Exported profile: full_html_with_shortcodes
  $profiles['full_html_with_shortcodes'] = array(
    'format' => 'full_html_with_shortcodes',
    'editor' => 'tinymce',
    'settings' => array(
      'default' => 1,
      'user_choose' => 0,
      'show_toggle' => 1,
      'theme' => 'advanced',
      'language' => 'en',
      'buttons' => array(
        'default' => array(
          'bold' => 1,
          'italic' => 1,
          'justifyleft' => 1,
          'justifycenter' => 1,
          'justifyright' => 1,
          'bullist' => 1,
          'numlist' => 1,
          'undo' => 1,
          'redo' => 1,
          'link' => 1,
          'unlink' => 1,
          'image' => 1,
          'cleanup' => 1,
          'formatselect' => 1,
          'styleselect' => 1,
          'removeformat' => 1,
        ),
        'advhr' => array(
          'advhr' => 1,
        ),
        'advimage' => array(
          'advimage' => 1,
        ),
        'fullscreen' => array(
          'fullscreen' => 1,
        ),
        'paste' => array(
          'pasteword' => 1,
        ),
        'advlist' => array(
          'advlist' => 1,
        ),
        'wordcount' => array(
          'wordcount' => 1,
        ),
        'footnotes' => array(
          'footnotes' => 1,
        ),
        'linkit' => array(
          'linkit' => 1,
        ),
        'drupal' => array(
          'media' => 1,
          'shortcode_wysiwyg' => 1,
          'break' => 1,
        ),
      ),
      'toolbar_loc' => 'top',
      'toolbar_align' => 'left',
      'path_loc' => 'bottom',
      'resizing' => 1,
      'verify_html' => 1,
      'preformatted' => 1,
      'convert_fonts_to_spans' => 1,
      'remove_linebreaks' => 0,
      'apply_source_formatting' => 1,
      'paste_auto_cleanup_on_paste' => 0,
      'block_formats' => 'p,address,pre,h1,h2,h3,h4,h5,h6,div',
      'css_setting' => 'theme',
      'css_path' => '',
      'css_classes' => 'Float left=float-left
Float right=float-right
No Style=no-style',
    ),
    'rdf_mapping' => array(),
  );

  return $profiles;
}
