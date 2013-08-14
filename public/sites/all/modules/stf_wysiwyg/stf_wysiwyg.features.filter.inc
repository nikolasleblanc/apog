<?php
/**
 * @file
 * stf_wysiwyg.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function stf_wysiwyg_filter_default_formats() {
  $formats = array();

  // Exported format: Full HTML with Shortcodes.
  $formats['full_html_with_shortcodes'] = array(
    'format' => 'full_html_with_shortcodes',
    'name' => 'Full HTML with Shortcodes',
    'cache' => '1',
    'status' => '1',
    'weight' => '-20',
    'filters' => array(
      'filter_footnotes' => array(
        'weight' => '-50',
        'status' => '1',
        'settings' => array(
          'footnotes_collapse' => 0,
        ),
      ),
      'filter_htmlcorrector' => array(
        'weight' => '-49',
        'status' => '1',
        'settings' => array(),
      ),
      'shortcode' => array(
        'weight' => '-48',
        'status' => '1',
        'settings' => array(
          'col' => 1,
          'button' => 1,
          'box' => 1,
          'highlight' => 1,
          'divider' => 1,
          'dropcap' => 1,
          'dropshadow' => 1,
          'social' => 1,
          'contact' => 1,
          'teaser' => 1,
          'toggle' => 1,
          'icon-list' => 1,
        ),
      ),
      'shortcode_text_corrector' => array(
        'weight' => '-47',
        'status' => '1',
        'settings' => array(),
      ),
      'media_filter' => array(
        'weight' => '-46',
        'status' => '1',
        'settings' => array(),
      ),
      'filter_url' => array(
        'weight' => '-44',
        'status' => '1',
        'settings' => array(
          'filter_url_length' => '72',
        ),
      ),
    ),
  );

  return $formats;
}
