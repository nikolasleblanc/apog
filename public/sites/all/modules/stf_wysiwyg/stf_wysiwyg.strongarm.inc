<?php
/**
 * @file
 * stf_wysiwyg.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function stf_wysiwyg_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'filter_fallback_format';
  $strongarm->value = 'plain_text';
  $export['filter_fallback_format'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'media_flickr__api_key';
  $strongarm->value = 'fcb4300ee0858413e90b1e80e96f6fed';
  $export['media_flickr__api_key'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'media_flickr__api_secret';
  $strongarm->value = '6533ec2db26dcccd';
  $export['media_flickr__api_secret'] = $strongarm;

  return $export;
}
