(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;

(function($) {

/**
 * @file form_builder.js
 * Provide enhancements to the form building user interface.
 */

Drupal.behaviors.formBuilderElement = {};
Drupal.behaviors.formBuilderElement.attach = function(context) {
  var $wrappers = $('div.form-builder-wrapper:not(.form-builder-processed)', context);
  var $elements = $('div.form-builder-element:not(.form-builder-processed)', context);

  // If the context itself is a wrapper, add it to the list.
  if ($(context).is('div.form-builder-wrapper:not(.form-builder-processed)')) {
    $wrappers = $wrappers.add(context);
  }
  // If the context itself is an element, add to the list.
  else if ($(context).is('div.form-builder-element:not(.form-builder-processed)')) {
    $elements = $elements.add(context);
  }

  // Add a guard class.
  $wrappers.addClass('form-builder-processed');
  $elements.addClass('form-builder-processed');

  // Add over effect on rollover.
  // The .hover() method is not used to avoid issues with nested hovers.
  $wrappers.not('div.form-builder-empty-placeholder')
    .bind('mouseover', Drupal.formBuilder.addHover)
    .bind('mouseout', Drupal.formBuilder.removeHover);

  // Add AJAX to edit links.
  $wrappers.find('span.form-builder-links a.configure').click(Drupal.formBuilder.editField);

  // Add AJAX to remove links.
  $wrappers.find('span.form-builder-links a.remove').click(Drupal.formBuilder.editField);

  // Add AJAX to entire field for easy editing.
  $elements.each(function() {
    if ($(this).children('fieldset.form-builder-fieldset').length == 0) {
      var link = $(this).parents('div.form-builder-wrapper:first').find('a.configure').get(0);
      if (link) {
        $(this).click(Drupal.formBuilder.clickField).addClass('form-builder-clickable');
        $(this).find('div.form-builder-element label').click(Drupal.formBuilder.clickField);
      }
      else {
        $(this).addClass('form-builder-draggable');
      }
    }
  });

  // Disable field functionality on click.
  $elements.find('input, textarea').bind('mousedown', Drupal.formBuilder.disableField);
};

/**
 * Behavior to disable preview fields and instead open up the configuration.
 */
Drupal.behaviors.formBuilderFields = {};
Drupal.behaviors.formBuilderFields.attach = function(context) {
  // Bind a function to all elements to update the preview on change.
  var $configureForm = $('#form-builder-field-configure');

  $configureForm.find('input, textarea, select')
    .not('.form-builder-field-change')
    .addClass('form-builder-field-change')
    .bind('change', Drupal.formBuilder.elementPendingChange);

  $configureForm.find('input.form-text, textarea')
    .not('.form-builder-field-keyup')
    .addClass('form-builder-field-keyup')
    .bind('keyup', Drupal.formBuilder.elementPendingChange);
};

/**
 * Behavior for the entire form builder. Add drag and drop to elements.
 */
Drupal.behaviors.formBuilder = {};
Drupal.behaviors.formBuilder.attach = function(context) {
  var $formbuilder = $('#form-builder');
  var $elements = $('.form-builder-wrapper').not('.form-builder-empty-placeholder').not('.ui-draggable');
  $elements.draggable({
    distance: 4, // Pixels before dragging starts.
    handle: 'div.form-builder-title-bar, div.form-builder-element',
    helper: 'clone',
    appendTo: $formbuilder,
    opacity: 0.8,
    scope: 'form-builder',
    scroll: true,
    scrollSensitivity: 50,
    zIndex: 100,
    start: Drupal.formBuilder.startDrag,
    stop: Drupal.formBuilder.stopDrag
  });

  // This sets the height of the drag target to be at least as high as the field
  // palette so that field can be more easily dropped into an empty form.  IE6
  // does not respect min-height but does treat height in the same manner that
  // min-height would be expected.  So a check for browser and version is needed
  // here.
  var property = $.browser.msie && $.browser.version < 7 ? 'height' : 'min-height';
  $formbuilder.css(property, $('#form-builder-fields').height());

  // Add the placeholder for an empty form.
  Drupal.formBuilder.checkForm();
};

/**
 * Behavior that renders fieldsets as tabs within the field configuration form.
 */
Drupal.behaviors.formBuilderTabs = {};
Drupal.behaviors.formBuilderTabs.attach = function(context) {
  var $fieldsets = $('fieldset.form-builder-group:not(.form-builer-tabs-processed)', context);
  var $close = $('<a class="close" href="#">' + Drupal.t('Close') + '</a>');
  var $tabs;
  var tabs = '';

  // Convert fieldsets to tabs.
  tabs = '<ul class="form-builder-tabs tabs clearfix">';
  $fieldsets.children('legend').each(function() {
    tabs += '<li>' + this.innerHTML + '</li>';
    $(this).remove();
  });
  tabs += '</ul>';

  // Add the new tabs to the page.
  $tabs = $(tabs);
  $fieldsets.filter(':first').before($close).before($tabs);

  // Remove 'fieldset-legend' class from tabs.
  $tabs.find('.fieldset-legend').removeClass('fieldset-legend');

  // Set clearfix on the parent div.
  $tabs.parent().addClass('clearfix');

  // Hide all the fieldsets except the first.
  $fieldsets.not(':first').css('display', 'none');
  $tabs.find('li:first').addClass('active').click(Drupal.formBuilder.clickCancel);

  // Enable tab switching by clicking on each tab.
  $tabs.find('li:not(.close)').each(function(index) {
    $(this).click(function() {
      $fieldsets.filter(':visible').css('display', 'none');
      $fieldsets.eq(index).css('display', 'block');
      $tabs.find('li.active').removeClass('active').unbind('click', Drupal.formBuilder.clickCancel);
      $(this).addClass('active').click(Drupal.formBuilder.clickCancel);
      Drupal.formBuilder.fixTableDragTabs($fieldsets.eq(index).get(0));
    });
  });

  $close.click(Drupal.formBuilder.clickCancel);

  // Add guard class.
  $fieldsets.addClass('form-builer-tabs-processed');
};

/**
 * Submit the delete form via AJAX or close the form with the cancel link.
 */
Drupal.behaviors.formBuilderDeleteConfirmation = {};
Drupal.behaviors.formBuilderDeleteConfirmation.attach = function(context) {
  var $confirmForm = $('form.confirmation', context);

  // If the confirmation form is the context.
  if ($(context).is('form.confirmation')) {
    $confirmForm = $(context);
  }

  if ($confirmForm.length) {
    $confirmForm.submit(Drupal.formBuilder.deleteField);
    $confirmForm.find('a').click(Drupal.formBuilder.clickCancel);
  }
};

/**
 * Keeps record of if a mouse button is pressed.
 */
Drupal.behaviors.formBuilderMousePress = {};
Drupal.behaviors.formBuilderMousePress.attach = function(context) {
  if (context == document) {
    $('body').mousedown(function() { Drupal.formBuilder.mousePressed = 1; });
    $('body').mouseup(function() { Drupal.formBuilder.mousePressed = 0; });
  }
};

/**
 * Scrolls the add new field block with the window.
 */
Drupal.behaviors.formBuilderBlockScroll = {};
Drupal.behaviors.formBuilderBlockScroll.attach = function(context) {
  var $list = $('ul.form-builder-fields', context);

  if ($list.length) {
    var $block = $list.parents('div.block:first').css('position', 'relative');
    var blockScrollStart = $block.offset().top;

    function blockScroll() {
      // Do not move the palette while dragging a field.
      if (Drupal.formBuilder.activeDragUi) {
        return;
      }

      var toolbarHeight = parseInt($('body.toolbar').css('padding-top'));
      var windowOffset = $(window).scrollTop() + (toolbarHeight ? toolbarHeight : 0);
      var blockHeight = $block.height();
      var formBuilderHeight = $('#form-builder').height();
      if (windowOffset - blockScrollStart > 0) {
        // Do not scroll beyond the bottom of the editing area.
        var newTop = Math.min(windowOffset - blockScrollStart + 20, formBuilderHeight - blockHeight);
        $block.animate({ top: (newTop + 'px') }, 'fast');
      }
      else {
        $block.animate({ top: '0px' }, 'fast');
      }
    }

    var timeout = false;
    function scrollTimeout() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(blockScroll, 100);
    }

    $(window).scroll(scrollTimeout);
  }
};

/**
 * Behavior for the Add a field block.
 * @param {Object} context
 */
Drupal.behaviors.formBuilderNewField = {};
Drupal.behaviors.formBuilderNewField.attach = function(context) {
  var $list = $('ul.form-builder-fields', context);

  if ($list.length) {
    // Allow items to be copied from the list of new fields.
    $list.children('li:not(.ui-draggable)').draggable({
      opacity: 0.8,
      helper: 'clone',
      scope: 'form-builder',
      scroll: true,
      scrollSensitivity: 50,
      tolerance: 'pointer',
      zIndex: 100,
      start: Drupal.formBuilder.startDrag,
      stop: Drupal.formBuilder.stopDrag
    });
  }
};

Drupal.formBuilder = {
  // Variable to prevent multiple requests.
  updatingElement: false,
  // Variables to allow delayed updates on textfields and textareas.
  updateDelayElement: false,
  updateDelay: false,
  // Variable holding the actively edited element (if any).
  activeElement: false,
  // Variable holding the active drag object (if any).
  activeDragUi: false,
  // Variables to keep trak of the current and previous drop target. Used to
  // prevent overlapping targets from being shown as active at the same time.
  activeDropzone: false,
  previousDropzones: [],
  // Variable of the time of the last update, used to prevent old data from
  // replacing newer updates.
  lastUpdateTime: 0,
  // Status of mouse click.
  mousePressed: 0,
  // Selector for a custom field configuration form.
  fieldConfigureForm: false
};

/**
 * Event callback for mouseover of fields. Adds hover class.
 */
Drupal.formBuilder.addHover = function() {
  // Do not add hover effect while dragging over other fields.
  if (!Drupal.formBuilder.activeDragUi && !Drupal.formBuilder.mousePressed) {
    if ($(this).find('div.form-builder-hover').length == 0) {
      $(this).addClass('form-builder-hover');
    }
  }
};

/**
 * Event callback for mouseout of fields. Removes hover class.
 */
Drupal.formBuilder.removeHover = function() {
  // Do not add hover effect while dragging over other fields.
  if (!Drupal.formBuilder.activeDragUi && !Drupal.formBuilder.mousePressed) {
    $(this).removeClass('form-builder-hover');
  }
};

/**
 * Click handler for fields.
 *
 * Note this is applied to both the entire field and to the labels within the
 * field, as they have special browser behavior that needs to be overridden.
 */
Drupal.formBuilder.clickField = function(e) {
  // Allow select lists to be clicked on without opening the edit options.
  if ($(e.target).is('select')) {
    return;
  }

  // Find the first configure link for this field, ensuring we don't get a link
  // belonging to a nested form element within this element.
  var $wrapper = $(this).parents('.form-builder-wrapper:first');
  var link = $wrapper.find('a.configure').not($wrapper.find('.form-builder-element .form-builder-element a')).get(0);
  Drupal.formBuilder.editField.apply(link);

  return false;
};

/**
 * Mousedown event on element previews.
 */
Drupal.formBuilder.disableField = function(e) {
  return false;
};

/**
 * Load the edit form from the server.
 */
Drupal.formBuilder.editField = function() {
  var $element = $(this).parents('div.form-builder-wrapper');
  var $link = $(this);

  // Prevent duplicate clicks from taking effect if already handling a click.
  if (Drupal.formBuilder.updatingElement) {
    return false;
  }

  // Show loading indicators.
  $link.addClass('progress');

  // If clicking on the link a second time, close the form instead of open.
  if ($element.get(0) == Drupal.formBuilder.activeElement && $link.get(0) == Drupal.formBuilder.activeLink) {
    Drupal.formBuilder.closeActive(function() {
      $link.removeClass('progress');
    });
    Drupal.formBuilder.unsetActive();
    return false;
  }

  var getForm = function() {
    if (Drupal.formBuilder.fieldConfigureForm) {
      $(Drupal.formBuilder.fieldConfigureForm).html(Drupal.settings.formBuilder.fieldLoading);
    }

    $.ajax({
      url: $link.attr('href'),
      type: 'GET',
      dataType: 'json',
      data: 'js=1',
      success: Drupal.formBuilder.displayForm
    });
  };

  Drupal.formBuilder.updatingElement = true;
  Drupal.formBuilder.closeActive(getForm);
  Drupal.formBuilder.setActive($element.get(0), $link.get(0));

  return false;
};

/**
 * Click handler for deleting a field.
 */
Drupal.formBuilder.deleteField = function() {
  $(this).parents('div.form-builder-wrapper:first').animate({ height: 'hide', opacity: 'hide' }, 'normal', function() {
    // If this is a unique field, show the field in the palette again.
    var elementId = $(this).find('div.form-builder-element').attr('id');
    $('ul.form-builder-fields').find('li.' + elementId).show('slow');
    // Remove the field from the form.
    $(this).remove();

    // Check for an entirely empty form and for empty fieldsets.
    Drupal.formBuilder.checkForm();
    Drupal.formBuilder.checkFieldsets([], true);
  });
};

Drupal.formBuilder.clickCancel = function() {
  Drupal.formBuilder.closeActive();
  Drupal.formBuilder.unsetActive();
  return false;
};

/**
 * Display the edit form from the server.
 */
Drupal.formBuilder.displayForm = function(response) {
  // Update Drupal settings.
  if (response.settings) {
    $.extend(true, Drupal.settings, response.settings);
  }

  var $preview = $('#form-builder-element-' + response.elementId);
  var $form = $(response.html);

  if (Drupal.formBuilder.fieldConfigureForm) {
    $(Drupal.formBuilder.fieldConfigureForm).html($form);
    $form.css('display', 'none');
  }
  else {
    $form.insertAfter($preview).css('display', 'none');
  }

  Drupal.attachBehaviors($form.get(0));

  $form
    // Add the ajaxForm behavior to the new form.
    .ajaxForm()
    // Using the 'data' $.ajaxForm property doesn't seem to work.
    // Manually add a hidden element to pass additional data on submit.
    .prepend('<input type="hidden" name="return" value="field" />')
    // Add in any messages from the server.
    .find('fieldset:first').find('.fieldset-wrapper:first').prepend(response.messages);

  $form.slideDown(function() {
    $preview.parents('div.form-builder-wrapper:first').find('a.progress').removeClass('progress');
    $form.find('input:visible:first').focus();
  });

  Drupal.formBuilder.updatingElement = false;
};

/**
 * Upon changing a field, submit via AJAX to the server.
 */
Drupal.formBuilder.elementChange = function() {
  if (!Drupal.formBuilder.updatingElement) {
    $(this).parents('form:first').ajaxSubmit({
      success: Drupal.formBuilder.updateElement,
      dataType: 'json'
    });
  }

  // Clear any pending updates until further changes are made.
  if (Drupal.formBuilder.updateDelay) {
    clearTimeout(Drupal.formBuilder.updateDelay);
  }

  Drupal.formBuilder.updatingElement = true;
};

/**
 * Update a field after a delay.
 *
 * Similar to immediately changing a field, this field as pending changes that
 * will be updated after a delay. This includes textareas and textfields in
 * which updating continuously would be a strain the server and actually slow
 * down responsiveness.
 */
Drupal.formBuilder.elementPendingChange = function(e) {
  // Only operate on "normal" keys, excluding special function keys.
  // http://protocolsofmatrix.blogspot.com/2007/09/javascript-keycode-reference-table-for.html
  if (e.type == 'keyup' && !(
    e.keyCode >= 48 && e.keyCode <= 90 || // 0-9, A-Z.
    e.keyCode >= 93 && e.keyCode <= 111 || // Number pad.
    e.keyCode >= 186 && e.keyCode <= 222 || // Symbols.
    e.keyCode == 8) // Backspace.
    ) {
    return;
  }

  if (Drupal.formBuilder.updateDelay) {
    clearTimeout(Drupal.formBuilder.updateDelay);
  }
  Drupal.formBuilder.updateDelayElement = this;
  Drupal.formBuilder.updateDelay = setTimeout("Drupal.formBuilder.elementChange.apply(Drupal.formBuilder.updateDelayElement, [true])", 500);
};

/**
 * After submitting the change to the server, display the updated element.
 */
Drupal.formBuilder.updateElement = function(response) {
  var $configureForm = $('#form-builder-field-configure');

  // Do not let older requests replace newer updates.
  if (response.time < Drupal.formBuilder.lastUpdateTime) {
    return;
  }
  else {
    Drupal.formBuilder.lastUpdateTime = response.time;
  }

  // Update Drupal.settings.
  if (response.settings) {
    $.extend(true, Drupal.settings, response.settings);
  }

  // Set the error class on fields.
  $configureForm.find('.error').removeClass('error');
  if (response.errors) {
    for (var elementName in response.errors) {
      elementName = elementName.replace(/([a-z0-9_]+)\](.*)/, '$1$2]');
      $configureForm.find('[name=' + elementName + ']').addClass('error');
    }
  }

  // Display messages, if any.
  $configureForm.find('.messages').remove();
  if (response.messages) {
    $configureForm.find('fieldset:visible:first').find('.fieldset-wrapper:first').prepend(response.messages);
  }

  // Do not update the element if errors were received.
  if (!response.errors) {
    var $exisiting = $('#form-builder-element-' + response.elementId);
    var $new = $(response.html).find('div.form-builder-element:first');
    $exisiting.replaceWith($new);

    // Expand root level fieldsets after updating to prevent them from closing
    // after every update.
    $new.children('fieldset.collapsible').removeClass('collapsed');
    Drupal.attachBehaviors($new.get(0));
  }

  // Set the variable stating we're done updating.
  Drupal.formBuilder.updatingElement = false;
};

/**
 * When adding a new field, remove the placeholder and insert the new element.
 */
Drupal.formBuilder.addElement = function(response) {
  // Update Drupal settings.
  if (response.settings) {
    $.extend(true, Drupal.settings, response.settings);
  }

  // This is very similar to the update element callback, only we replace the
  // entire wrapper instead of just the element.
  var $exisiting = $('#form-builder-element-' + response.elementId).parent();
  var $new = $(response.html).find('div.form-builder-element:first').parent();
  $exisiting.replaceWith($new);
  Drupal.attachBehaviors($new.get(0));

  // Set the variable stating we're done updating.
  Drupal.formBuilder.updatingElement = false;

  // Insert the new position form containing the new element, but maintain
  // the existing form action.
  var positionAction = $('#form-builder-positions').attr('action');
  $('#form-builder-positions').replaceWith(response.positionForm);
  $('#form-builder-positions').attr('action', positionAction);

  // Submit the new positions form to save the new element position.
  Drupal.formBuilder.updateElementPosition($new.get(0));
};

/**
 * Given an element, update it's position (weight and parent) on the server.
 */
Drupal.formBuilder.updateElementPosition = function(element) {
  var $element = $(element);

  // Update weights of all children within this element's parent.
  $element.parent().children('div.form-builder-wrapper').each(function(index) {
    var child_id = $(this).children('div.form-builder-element:first').attr('id');
    $('#form-builder-positions input.form-builder-weight').filter('.' + child_id).val(index);
  });

  // Update this element's parent.
  var $parent = $element.parents('div.form-builder-element:first');
  var parent_id = $parent.length ? $parent.attr('id').replace(/form-builder-element-(.*)/, '$1') : 0;
  var child_id = $element.children('div.form-builder-element:first').attr('id');
  $('#form-builder-positions input.form-builder-parent').filter('.' + child_id).val(parent_id);

  // Submit the position form via AJAX to save the new weights and parents.
  $('#form-builder-positions').ajaxSubmit();
};

/**
 * Called when a field is about to be moved via Sortables.
 *
 * @param e
 *   The event object containing status information about the event.
 * @param ui
 *   The jQuery Sortables object containing information about the sortable.
 */
Drupal.formBuilder.startDrag = function(e, ui) {
  Drupal.formBuilder.activeDragUi = ui;

  var $this = $(this);
  if ($this.hasClass('form-builder-unique') || $this.hasClass('form-builder-wrapper')) {
    $this.hide();
  }

  // Check fieldsets and add placeholder text if needed.
  Drupal.formBuilder.checkFieldsets([this, ui.helper]);

  // Create the drop targets in between the form elements.
  Drupal.formBuilder.createDropTargets(this, ui.helper);
};

/**
 * Creates drop targets for the dragged element to be dropped into.
 */
Drupal.formBuilder.createDropTargets = function(draggable, helper) {
  var $placeholder = $('<div class="form-builder-placeholder"></div>');
  var $elements = $('#form-builder .form-builder-wrapper:not(.form-builder-empty-placeholder)').not(draggable).not(helper);

  if ($elements.length == 0) {
    // There are no form elements, insert a placeholder
    var $formBuilder = $('#form-builder');
    $placeholder.height($formBuilder.height());
    $placeholder.appendTo($formBuilder);
  }
  else {
    $elements.each(function(i) {
      $placeholder.clone().insertAfter(this);
      // If the element is the first in its container, add a drop target above it.
      if (this == $(this).parent().children('.form-builder-wrapper:not(.ui-draggable-dragging)').not(draggable)[0]) {
        $placeholder.clone().insertBefore(this);
      }
    });
  }

  // Enable the drop targets
  $('#form-builder').find('.form-builder-placeholder, .form-builder-empty-placeholder').droppable({
    greedy: true,
    scope: 'form-builder',
    tolerance: 'pointer',
    drop: Drupal.formBuilder.dropElement,
    over: Drupal.formBuilder.dropHover,
    out: Drupal.formBuilder.dropHover
  });
};

/**
 * Handles form elements being dropped onto the form.
 *
 * Existing elements will trigger a reorder, while new elements will be added in
 * place to the form.
 */
Drupal.formBuilder.dropElement = function (event, ui) {
  var $element = ui.draggable;
  var $placeholder = $(this);
  
  // If the element is a new field from the palette, update it with a real field.
  if ($element.is('.form-builder-palette-element')) {
    var name = 'new_' + new Date().getTime();
    // If this is a "unique" element, its element ID is hard-coded.
    if ($element.is('.form-builder-unique')) {
      name = $element.get(0).className.replace(/^.*?form-builder-element-([a-z0-9_]+).*?$/, '$1');
    }

    var $ajaxPlaceholder = $('<div class="form-builder-wrapper form-builder-new-field"><div id="form-builder-element-' + name + '" class="form-builder-element"><span class="progress">' + Drupal.t('Please wait...') + '</span></div></div>');

    $.ajax({
      url: $element.find('a').attr('href'),
      type: 'GET',
      dataType: 'json',
      data: 'js=1&element_id=' + name,
      success: Drupal.formBuilder.addElement
    });

    $placeholder.replaceWith($ajaxPlaceholder);

    Drupal.formBuilder.updatingElement = true;
  }
  // Update the positions (weights and parents) in the form cache.
  else {
    $element.removeAttr('style');
    $placeholder.replaceWith($element);
    ui.helper.remove();
    Drupal.formBuilder.updateElementPosition($element.get(0));
  }

  Drupal.formBuilder.activeDragUi = false;

  // Scroll the palette into view.
  $(window).triggerHandler('scroll');
};

/**
 * Adjusts the placeholder height for drop targets as they are hovered-over.
 */
Drupal.formBuilder.dropHover = function (event, ui) {
  if (event.type == 'dropover') {
    // In the event that two droppables overlap, the latest one acts as the drop
    // target. If there is previous active droppable hide it temporarily.
    if (Drupal.formBuilder.activeDropzone) {
      $(Drupal.formBuilder.activeDropzone).css('display', 'none');
      Drupal.formBuilder.previousDropzones.push(Drupal.formBuilder.activeDropzone);
    }
    $(this).css({ height: ui.helper.height() + 'px', display: ''}).addClass('form-builder-placeholder-hover');
    Drupal.formBuilder.activeDropzone = this;
  }
  else {
    $(this).css({ height: '', display: '' }).removeClass('form-builder-placeholder-hover');

    // If this was active drop target, we remove the active state.
    if (Drupal.formBuilder.activeDropzone && Drupal.formBuilder.activeDropzone == this) {
      Drupal.formBuilder.activeDropzone = false;
    }
    // If there is a previous drop target that was hidden, restore it.
    if (Drupal.formBuilder.previousDropzones.length) {
      $(Drupal.formBuilder.previousDropzones).css('display', '');
      Drupal.formBuilder.activeDropzone = Drupal.formBuilder.previousDropzones.pop;
    }
  }
};

/**
 * Called when a field has stopped moving via draggable.
 *
 * @param e
 *   The event object containing status information about the event.
 * @param ui
 *   The jQuery Sortables object containing information about the sortable.
 */
Drupal.formBuilder.stopDrag = function(e, ui) {
  var $this = $(this);
  // If the activeDragUi is still set, we did not drop onto the form.
  if (Drupal.formBuilder.activeDragUi) {
    if ($this.hasClass('form-builder-unique') || $this.hasClass('form-builder-wrapper')) {
      $this.show();
    }
  }

  // Remove the placeholders and reset the hover state for all for elements
  $('#form-builder .form-builder-placeholder').remove();
  $('#form-builder .form-builder-hover').removeClass('form-builder-hover');

  Drupal.formBuilder.checkFieldsets();

  // Scroll the palette into view.
  $(window).triggerHandler('scroll');
};

/**
 * Insert DIVs into empty fieldsets so that items can be dropped within them.
 *
 * This function is called every time an element changes positions during
 * a drag and drop operation. Fieldsets are considered empty if they have no
 * immediate children or they only contain exclusions.
 *
 * @param exclusions
 *   An array of DOM objects within a fieldset that should not be included when
 *   checking if the fieldset is empty.
 */
Drupal.formBuilder.checkFieldsets = function(exclusions, animate) {
  var $wrappers = $('#form-builder div.form-builder-element > fieldset.form-builder-fieldset > div.fieldset-wrapper');

  // Make sure exclusions is an array and always skip any description.
  exclusions = exclusions ? exclusions : [];
  exclusions.push('.fieldset-description');

  // Insert a placeholder into all empty fieldset wrappers.
  $wrappers.each(function() {
    var children = $(this).children(':visible, :not(.ui-draggable-dragging)');
    for (var i in exclusions) {
      children = children.not(exclusions[i]);
    }

    if (children.length == 0) {
      // No children, add a placeholder.
      if (animate) {
        $(Drupal.settings.formBuilder.emptyFieldset).css('display', 'none').appendTo(this).slideDown();
      }
      else {
        $(Drupal.settings.formBuilder.emptyFieldset).appendTo(this);
      }
    }
    else if (children.length > 1 && children.hasClass('form-builder-empty-placeholder')) {
      // The fieldset has at least one element besides the placeholder, remove
      // the placeholder.
      $(this).find('.form-builder-empty-placeholder').remove();
    }
  });
};

/**
 * Check the root form tag and place explanatory text if the form is empty.
 */
Drupal.formBuilder.checkForm = function() {
  var $formBuilder = $('#form-builder');
  if ($formBuilder.children('div.form-builder-wrapper').length == 0) {
    $formBuilder.append(Drupal.settings.formBuilder.emptyForm);
  }
};

Drupal.formBuilder.setActive = function(element, link) {
  Drupal.formBuilder.unsetActive();
  Drupal.formBuilder.activeElement = element;
  Drupal.formBuilder.activeLink = link;
  $(Drupal.formBuilder.activeElement).addClass('form-builder-active');
};

Drupal.formBuilder.unsetActive = function() {
  if (Drupal.formBuilder.activeElement) {
    $(Drupal.formBuilder.activeElement).removeClass('form-builder-active');
    Drupal.formBuilder.activeElement = false;
    Drupal.formBuilder.activeLink = false;
  }
};

Drupal.formBuilder.closeActive = function(callback) {
  if (Drupal.formBuilder.activeElement) {
    var $activeForm = Drupal.formBuilder.fieldConfigureForm ? $(Drupal.formBuilder.fieldConfigureForm).find('form') : $(Drupal.formBuilder.activeElement).find('form');

    if ($activeForm.length) {
      Drupal.freezeHeight();
      $activeForm.slideUp(function(){
        $(this).remove();
        // Set a message in the custom configure form location if it exists.
        if (Drupal.formBuilder.fieldConfigureForm) {
          $(Drupal.formBuilder.fieldConfigureForm).html(Drupal.settings.formBuilder.noFieldSelected);
        }
        if (callback) {
          callback.call();
        }
      });
    }
  }
  else if (callback && $.isFunction(callback)) {
    callback.call();
  }

  return false;
};

/**
 * Work around for tabledrags within tabs. On load, if the tab was hidden the
 * offsets cannot be calculated correctly. Recalculate and update the tableDrag.
 */
Drupal.formBuilder.fixTableDragTabs = function(context) {
  if (Drupal.tableDrag && Drupal.tableDrag.length > 1) {
    for (var n in Drupal.tableDrag) {
      if (typeof(Drupal.tableDrag[n]) == 'object') {
        var table = $('#' + n, context).get(0);
        if (table) {
          var indent = Drupal.theme('tableDragIndentation');
          var testCell = $('tr.draggable:first td:first', table).prepend(indent).prepend(indent);
          Drupal.tableDrag[n].indentAmount = $('.indentation', testCell).get(1).offsetLeft - $('.indentation', testCell).get(0).offsetLeft;
          $('.indentation', testCell).slice(0, 2).remove();
        }
      }
    }
  }
};

})(jQuery);
;

/**
 * @file
 * Add JavaScript behaviors for the "options" form element type.
 */

(function($) {

Drupal.optionElements = Drupal.optionElements || {};
Drupal.behaviors.optionsElement = Drupal.behaviors.optionsElement || {};

Drupal.behaviors.optionsElement.attach = function(context) {
  $('div.form-options:not(.options-element-processed)', context).each(function() {
    $(this).addClass('options-element-processed');
    var optionsElement = new Drupal.optionsElement(this);
    Drupal.optionElements[optionsElement.identifier] = optionsElement;
  });
};

/**
 * Constructor for an options element.
 */
Drupal.optionsElement = function(element) {
  var self = this;

  // Find the original "manual" fields.
  this.element = element;
  this.manualElement = $(element).find('div.options').get(0);
  this.manualOptionsElement = $(element).find('textarea').get(0);
  this.manualDefaultValueElement = $(element).find('input.form-text').get(0);
  this.keyTypeToggle = $(element).find('input.key-type-toggle').get(0);
  this.multipleToggle = $(element).find('input.multiple-toggle').get(0);

  // Setup variables containing the current status of the widget.
  this.optgroups = $(element).is('.options-optgroups');
  this.multiple = $(element).is('.options-multiple');
  this.keyType = element.className.replace(/^.*?options-key-type-([a-z]+).*?$/, '$1');
  this.customKeys = Boolean(element.className.match(/options-key-custom/));
  this.identifier = this.manualOptionsElement.id + '-widget';
  // jQuery 1.6 API change: http://api.jquery.com/prop/
  this.enabled = $.fn.prop ? !$(this.manualOptionsElement).prop('readonly') : !$(this.manualOptionsElement).attr('readonly');
  this.defaultValuePattern = $(element).find('input.default-value-pattern').val();

  if (this.defaultValuePattern) {
    this.defaultValuePattern = new RegExp(this.defaultValuePattern);
  }

  // Warning messages.
  this.keyChangeWarning = Drupal.t('Custom keys have been specified in this list. Removing these custom keys may change way data is stored. Are you sure you wish to remove these custom keys?');

  // Setup new DOM elements containing the actual options widget.
  this.optionsElement = $('<div></div>').get(0); // Temporary DOM object.
  this.optionsToggleElement = $(Drupal.theme('optionsElementToggle')).get(0);
  this.optionAddElement = $(Drupal.theme('optionsElementAdd')).get(0);

  // Add the options widget and toggle elements to the page.
  $(this.manualElement).css('display', 'none').before(this.optionsElement).after(this.optionsToggleElement).after(this.optionAddElement);

  // Enable add item link.
  $(this.optionAddElement).find('a').click(function() {
    var newOption = self.addOption($('table tr:last', self.optionsElement).get(0));
    $(newOption).find('input[type=text]:visible:first').focus();
    return false;
  });

  // Enable the toggle action for manual entry of options.
  $(this.optionsToggleElement).find('a').click(function() {
    self.toggleMode();
    return false;
  });

  // Add a handler for key type changes.
  if (this.keyTypeToggle) {
    $(this.keyTypeToggle).click(function() {
      var checked = $(this).attr('checked');
      // Before switching the key type, ensure we're not destroying user keys.
      if (!checked) {
        var options = self.optionsFromText();
        var confirm = false;
        if (self.keyType == 'associative') {
          for (var n = 0; n < options.length; n++) {
            if (options[n].key != options[n].value) {
              confirm = true;
              break;
            }
          }
        }
        if (confirm) {
          if (window.confirm(self.keyChangeWarning)) {
            self.setCustomKeys(false);
          }
        }
        else {
          self.setCustomKeys(false);
        }
      }
      else {
        self.setCustomKeys(true);
      }
    });
  }

  // Add a handler for multiple value changes.
  if (this.multipleToggle) {
    $(this.multipleToggle).click(function(){
      self.setMultiple($(this).attr('checked'));
    });
  }

  // Be sure to show the custom keys if we have any errors.
  if (Drupal.settings.optionsElement && Drupal.settings.optionsElement.errors) {
    this.customKeys = true;
  }

  // Update the options widget with the current state of the textarea.
  this.updateWidgetElements();

  // Highlight errors that may have occurred during Drupal validation.
  if (Drupal.settings.optionsElement && Drupal.settings.optionsElement.errors) {
    this.checkKeys(Drupal.settings.optionsElement.errors, 'error');
  }
}

/**
 * Update the widget element based on the current values of the manual elements.
 */
Drupal.optionsElement.prototype.updateWidgetElements = function() {
  var self = this;

  // Create a new options element and replace the existing one.
  var newElement = $(Drupal.theme('optionsElement', this)).get(0);
  if ($(this.optionsElement).css('display') == 'none') {
    $(newElement).css('display', 'none');
  }
  $(this.optionsElement).replaceWith(newElement);
  this.optionsElement = newElement;

  // Manually set up table drag for the created table.
  Drupal.settings.tableDrag = Drupal.settings.tableDrag || {};
  Drupal.settings.tableDrag[this.identifier] = {
    'option-depth': {
      0: {
        action: 'depth',
        hidden: false,
        limit: 0,
        relationship: 'self',
        source: 'option-depth',
        target: 'option-depth'
      }
    }
  };

  // Allow indentation of elements if optgroups are supported.
  if (this.optgroups) {
    Drupal.settings.tableDrag[this.identifier]['option-parent'] = {
      0: {
        action: 'match',
        hidden: false,
        limit: 1,
        relationship: 'parent',
        source: 'option-value',
        target: 'option-parent'
      }
    };
  }

  // Enable button for adding options.
  $('a.add', this.optionsElement).click(function() {
    var newOption = self.addOption($(this).parents('tr:first').get(0));
    $(newOption).find('input[type=text]:visible:first').focus();
    return false;
  });

  // Enable button for removing options.
  $('a.remove', this.optionsElement).click(function() {
    self.removeOption($(this).parents('tr:first').get(0));
    return false;
  });

  // Add the same update action to all textfields and radios.
  $('input', this.optionsElement).change(function() {
    self.updateOptionElements();
    self.updateManualElements();
  });

  // Add a delayed update to textfields.
  $('input.option-value', this.optionsElement).keyup(function(e) {
    self.pendingUpdate(e);
  });

  // Attach behaviors as normal to the new widget.
  Drupal.attachBehaviors(this.optionsElement);

  // Remove the "Show row weights" link
  $(".tabledrag-toggle-weight-wrapper").remove();

  // Add an onDrop action to the table drag instance.
  Drupal.tableDrag[this.identifier].onDrop = function() {
    // Update the checkbox/radio buttons for selecting default values.
    if (self.optgroups) {
      self.updateOptionElements();
    }
    // Update the options within the hidden text area.
    self.updateManualElements();
  };

  // Add an onIndent action to the table drag row instances.
  Drupal.tableDrag[this.identifier].row.prototype.onIndent = function() {
    if (this.indents) {
      $(this.element).addClass('indented');
    }
    else {
      $(this.element).removeClass('indented');
    }
  };

  // Update the default value and optgroups.
  this.updateOptionElements();
}

/**
 * Update the original form element based on the current state of the widget.
 */
Drupal.optionsElement.prototype.updateManualElements = function() {
  var options = {};

  // Build a list of current options.
  var previousOption = false;
  $(this.optionsElement).find('input.option-value').each(function() {
    var $row = $(this).is('tr') ? $(this) : $(this).parents('tr:first');
    var depth = $row.find('input.option-depth').val();
    if (depth == 1 && previousOption) {
      if (typeof(options[previousOption]) != 'object') {
        options[previousOption] = {};
      }
      options[previousOption][this.value] = this.value;
    }
    else {
      options[this.value] = this.value;
      previousOption = this.value;
    }
  });
  this.options = options;

  // Update the default value.
  var defaultValue = this.multiple ? [] : '';
  var multiple = this.multiple;
  $(this.optionsElement).find('input.option-default').each(function() {
    if (this.checked && this.value) {
      if (multiple) {
        defaultValue.push(this.value);
      }
      else {
        defaultValue = this.value;
      }
    }
  });
  this.defaultValue = defaultValue;

  // Update with the new text and trigger the change action on the field.
  this.optionsToText();

  if (this.manualDefaultValueElement) {
    // Don't wipe out custom pattern-matched default values.
    defaultValue = multiple ? defaultValue.join(', ') : defaultValue;
    if (defaultValue || !(this.defaultValuePattern && this.defaultValuePattern.test(this.manualDefaultValueElement.value))) {
      this.manualDefaultValueElement.value = defaultValue;
      $('.default-value-pattern-match', this.element).remove();
    }
  }

  $(this.manualOptionsElement).change();
}

/**
 * Several maintenance routines to update all rows of the options element.
 *
 * - Disable options for optgroups if indented.
 * - Disable add and delete links if indented.
 * - Match the default value radio button value to the key of the text element.
 */
Drupal.optionsElement.prototype.updateOptionElements = function() {
  var self = this;
  var previousRow = false;
  var previousElement = false;
  var $rows = $(this.optionsElement).find('tbody tr');

  $rows.each(function(index) {
    var optionValue = $(this).find('input.option-value').val();
    var optionKey = $(this).find('input.option-key').val();

    // Update the elements key if matching the key and value.
    if (self.keyType == 'associative') {
      $(this).find('input.option-key').val(optionValue);
    }

    // Match the default value checkbox/radio button to the option's key.
    $(this).find('input.option-default').val(optionKey ? optionKey : optionValue);

    // Hide the add/remove links the row if indented.
    var depth = $(this).find('input.option-depth').val();
    var defaultInput = $(this).find('input.option-default').get(0);

    if (depth == 1) {
      // Affect the parent row, adjusting properties for optgroup items.
      $(previousElement).attr('disabled', true).attr('checked', false);
      $(previousRow).addClass('optgroup').find('a.add, a.remove').css('display', 'none');
      $(this).find('a.add, a.remove').css('display', '');
      $(defaultInput).attr('disabled', false);

      // Hide the key column for the optgroup. It would be nice if hiding
      // columns worked in IE7, but for now this only works in IE8 and other
      // standards-compliant browsers.
      if (self.customKeys && (!$.browser.msie || $.browser.version >= 8)) {
        $(previousRow).find('td.option-key-cell').css('display', 'none');
        $(previousRow).find('td.option-value-cell').attr('colspan', 2);
      }
    }
    else {
      // Set properties for normal options that are not optgroups.
      $(defaultInput).attr('disabled', false);
      $(this).removeClass('optgroup').find('a.add, a.remove').css('display', '');

      // Hide the key column. See note above for compatibility concerns.
      if (self.customKeys && (!$.browser.msie || $.browser.version >= 8)) {
        $(this).find('td.option-key-cell').css('display', '');
        $(this).find('td.option-value-cell').attr('colspan', '');
      }
      previousElement = defaultInput;
      previousRow = this;
    }
  });

  // Do not allow the last item to be removed.
  if ($rows.size() == 1) {
    $rows.find('a.remove').css('display', 'none')
  }

  // Disable items if needed.
  if (this.enabled == false) {
    this.disable();
  }
}

/**
 * Add a new option below the current row.
 */
Drupal.optionsElement.prototype.addOption = function(currentOption) {
  var self = this;
  var windowHieght = $(document).height();
  var newOption = $(currentOption).clone()
    .find('input.option-key').val(self.keyType == 'numeric' ? self.nextNumericKey() : '').end()
    .find('input.option-value').val('').end()
    .find('input.option-default').attr('checked', false).end()
    .find('a.tabledrag-handle').remove().end()
    .removeClass('drag-previous')
    .insertAfter(currentOption)
    .get(0);

  // Scroll down to accomidate the new option.
  $(window).scrollTop($(window).scrollTop() + $(document).height() - windowHieght);

  // Make the new option draggable.
  Drupal.tableDrag[this.identifier].makeDraggable(newOption);

  // Enable button for adding options.
  $('a.add', newOption).click(function() {
    var newOption = self.addOption($(this).parents('tr:first').get(0));
    $(newOption).find('input[type=text]:visible:first').focus();
    return false;
  });

  // Enable buttons for removing options.
  $('a.remove', newOption).click(function() {
    self.removeOption(newOption);
    return false;
  });

  // Add the update action to all textfields and radios.
  $('input', newOption).change(function() {
    self.updateOptionElements();
    self.updateManualElements();
  });

  // Add a delayed update to textfields.
  $('input.option-value', newOption).keyup(function(e) {
    self.pendingUpdate(e);
  });

  this.updateOptionElements();
  this.updateManualElements();

  return newOption;
}

/**
 * Remove the current row.
 */
Drupal.optionsElement.prototype.removeOption = function(currentOption) {
  $(currentOption).remove();

  this.updateOptionElements();
  this.updateManualElements();
}

/**
 * Toggle link for switching between the JavaScript and manual entry.
 */
Drupal.optionsElement.prototype.toggleMode = function() {
  if ($(this.optionsElement).is(':visible')) {
    var height = $(this.optionsElement).height();
    $(this.optionsElement).css('display', 'none');
    $(this.optionAddElement).css('display', 'none');
    $(this.manualElement).css('display', '').find('textarea').height(height);
    $(this.optionsToggleElement).find('a').text(Drupal.t('Normal entry'));
  }
  else {
    this.updateWidgetElements();
    $(this.optionsElement).css('display', '');
    $(this.optionAddElement).css('display', '');
    $(this.manualElement).css('display', 'none');
    $(this.optionsToggleElement).find('a').text(Drupal.t('Manual entry'));
  }
}

/**
 * Enable the changing of options.
 */
Drupal.optionsElement.prototype.enable = function() {
  this.enabled = true;
  $(this.manualOptionsElement).attr('readonly', '');
  $(this.element).removeClass('options-disabled');

  $('a.add, a.remove, a.tabledrag-handle, div.form-option-add a', this.element).css('display', '');
  $('input.form-text', this.optionsElement).attr('disabled', '');
};

/**
 * Disable the changing of options.
 */
Drupal.optionsElement.prototype.disable = function() {
  this.enabled = false;
  $(this.manualOptionsElement).attr('readonly', true);
  $(this.element).addClass('options-disabled');

  $('a.add, a.remove, a.tabledrag-handle, div.form-option-add a', this.element).css('display', 'none');
  $('input.form-text', this.optionsElement).attr('disabled', 'disabled');
};

/**
 * Enable entering of custom key values.
 */
Drupal.optionsElement.prototype.setCustomKeys = function(enabled) {
  if (enabled) {
    $(this.element).addClass('options-key-custom');
  }
  else {
    $(this.element).removeClass('options-key-custom');
  }

  this.customKeys = enabled;
  // Rebuild the options widget.
  this.updateManualElements();
  this.updateWidgetElements();
}

/**
 * Change the current key type (associative, custom, numeric, none).
 */
Drupal.optionsElement.prototype.setKeyType = function(type) {
  $(this.element)
    .removeClass('options-key-type-' + this.keyType)
    .addClass('options-key-type-' + type);
  this.keyType = type;
  // Rebuild the options widget.
  this.updateManualElements();
  this.updateWidgetElements();
}

/**
 * Set the element's #multiple property. Boolean TRUE or FALSE.
 */
Drupal.optionsElement.prototype.setMultiple = function(multiple) {
  if (multiple) {
    $(this.element).addClass('options-multiple');
  }
  else {
    // Unselect all default options except the first.
    $(this.optionsElement).find('input.option-default:checked:not(:first)').attr('checked', false);
    this.updateManualElements();
    $(this.element).removeClass('options-multiple');
  }
  this.multiple = multiple;
  // Rebuild the options widget.
  this.updateWidgetElements();
};

/**
 * Highlight duplicate keys.
 */
Drupal.optionsElement.prototype.checkKeys = function(duplicateKeys, cssClass){
  $(this.optionsElement).find('input.option-key').each(function() {
    if (duplicateKeys[this.value]) {
      $(this).addClass(cssClass);
    }
  });
};

/**
 * Update a field after a delay.
 *
 * Similar to immediately changing a field, this field as pending changes that
 * will be updated after a delay. This includes textareas and textfields in
 * which updating continuously would be a strain the server and actually slow
 * down responsiveness.
 */
Drupal.optionsElement.prototype.pendingUpdate = function(e) {
  var self = this;

  // Only operate on "normal" keys, excluding special function keys.
  // http://protocolsofmatrix.blogspot.com/2007/09/javascript-keycode-reference-table-for.html
  if (!(
    e.keyCode >= 48 && e.keyCode <= 90 || // 0-9, A-Z.
    e.keyCode >= 93 && e.keyCode <= 111 || // Number pad.
    e.keyCode >= 186 && e.keyCode <= 222 || // Symbols.
    e.keyCode == 8) // Backspace.
    ) {
    return;
  }

  if (this.updateDelay) {
    clearTimeout(this.updateDelay);
  }

  this.updateDelay = setTimeout(function(){
    self.updateOptionElements();
    self.updateManualElements();
  }, 500);
};

/**
 * Given an object of options, convert it to a text string.
 */
Drupal.optionsElement.prototype.optionsToText = function() {
  var $rows = $('tbody tr', this.optionsElement);
  var output = '';
  var inGroup = false;
  var rowCount = $rows.size();
  var defaultValues = [];

  for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    var isOptgroup = $rows.eq(rowIndex).is('.optgroup');
    var isChild = $rows.eq(rowIndex).is('.indented');
    var key = $rows.eq(rowIndex).find('input.option-key').val();
    var value = $rows.eq(rowIndex).find('input.option-value').val();

    // Handle groups.
    if (this.optgroups && value !== '' && isOptgroup) {
      output += '<' + ((key !== '') ? (key + '|') : '') + value + '>' + "\n";
      inGroup = true;
    }
    // Typical key|value pairs.
    else {
      // Exit out of any groups.
      if (this.optgroups && inGroup && !isChild) {
        output += "<>\n";
        inGroup = false;
      }

      // Add the row for the option.
      if (this.keyType == 'none' || this.keyType == 'associative') {
        output += value + "\n";
      }
      else if (value == '') {
        output += "\n";
      }
      else {
        output += ((key !== '') ? (key + '|') : '') + value + "\n";
      }
    }
  }

  this.manualOptionsElement.value = output;
};

/**
 * Given a text string, convert it to an object.
 */
Drupal.optionsElement.prototype.optionsFromText = function() {
  // Use jQuery val() instead of value because it fixes Windows line breaks.
  var rows = $(this.manualOptionsElement).val().match(/^.*$/mg);
  var parent = '';
  var options = [];
  var defaultValues = {};

  // Drop the last row if empty.
  if (rows.length && rows[rows.length - 1] == '') {
    rows.pop();
  }

  if (this.manualDefaultValueElement) {
    if (this.multiple) {
      var defaults = this.manualDefaultValueElement.value.split(',');
      for (var n = 0; n < defaults.length; n++) {
        var defaultValue = defaults[n].replace(/^[ ]*(.*?)[ ]*$/, '$1'); // trim().
        defaultValues[defaultValue] = defaultValue;
      }
    }
    else {
      var defaultValue = this.manualDefaultValueElement.value.replace(/^[ ]*(.*?)[ ]*$/, '$1'); // trim().
      defaultValues[defaultValue] = defaultValue;
    }
  }

  for (var n = 0; n < rows.length; n++) {
    var row = rows[n].replace(/^[ \r\n]*(.*?)[ \r\n]*$/, '$1'); // trim().
    var key = '';
    var value = '';
    var checked = false;
    var hasChildren = false;
    var groupClear = false;

    var matches = {};
    // Row is a group.
    if (this.optgroups && (matches = row.match(/^\<((([^>|]*)\|)?([^>]*))\>$/))) {
      if (matches[0] == '<>') {
        parent = '';
        groupClear = true;
      }
      else {
        key = matches[3] ? matches[3] : '';
        parent = value = matches[4];
        hasChildren = true;
      }
    }
    // Check if this row is a key|value pair.
    else if ((this.keyType == 'mixed' || this.keyType == 'numeric' || this.keyType == 'custom') && (matches = row.match(/^([^|]+)\|(.*)$/))) {
      key = matches[1];
      value = matches[2];
      checked = defaultValues[key];
    }
    // Row is a straight value.
    else {
      key = (this.keyType == 'mixed' || this.keyType == 'numeric') ? '' : row;
      value = row;
      if (!key && this.keyType == 'mixed') {
        checked = defaultValues[value];
      }
      else {
        checked = defaultValues[key];
      }
    }

    if (!groupClear) {
      options.push({
        key: key,
        value: value,
        parent: (value !== parent ? parent : ''),
        hasChildren: hasChildren,
        checked: (checked ? 'checked' : false)
      });
    }
  }

  // Convert options to numeric if no key is specified.
  if (this.keyType == 'numeric') {
    var nextKey = this.nextNumericKey();
    for (var n = 0; n < options.length; n++) {
      if (options[n].key == '') {
        options[n].key = nextKey;
        nextKey++;
      }
    }
  }

  return options;
};

/**
 * Utility method to get the next numeric option in a list of options.
 */
Drupal.optionsElement.prototype.nextNumericKey = function(options) {
  this.keyType = 'custom';
  options = this.optionsFromText();
  this.keyType = 'numeric';

  var maxKey = -1;
  for (var n = 0; n < options.length; n++) {
    if (options[n].key.match(/^[0-9]+$/)) {
      maxKey = Math.max(maxKey, options[n].key);
    }
  }
  return maxKey + 1;
};

/**
 * Theme function for creating a new options element.
 *
 * @param optionsElement
 *   An options element object.
 */
Drupal.theme.prototype.optionsElement = function(optionsElement) {
  var output = '';
  var options = optionsElement.optionsFromText();
  var hasDefault = optionsElement.manualDefaultValueElement;
  var defaultType = optionsElement.multiple ? 'checkbox' : 'radio';
  var keyType = optionsElement.customKeys ? 'textfield' : 'hidden';

  // Helper function to print out a single draggable option row.
  function tableDragRow(key, value, parent, indent, status) {
    var output = '';
    output += '<tr class="draggable' + (indent > 0 ? ' indented' : '') + '">'
    output += '<td class="' + (hasDefault ? 'option-default-cell' : 'option-order-cell') + '">';
    for (var n = 0; n < indent; n++) {
      output += Drupal.theme('tableDragIndentation');
    }
    output += '<input type="hidden" class="option-parent" value="' + parent.replace(/"/g, '&quot;') + '" />';
    output += '<input type="hidden" class="option-depth" value="' + indent + '" />';
    if (hasDefault) {
      output += '<input type="' + defaultType + '" name="' + optionsElement.identifier + '-default" class="form-radio option-default" value="' + key.replace(/"/g, '&quot;') + '"' + (status == 'checked' ? ' checked="checked"' : '') + (status == 'disabled' ? ' disabled="disabled"' : '') + ' />';
    }
    output += '</td><td class="' + (keyType == 'textfield' ? 'option-key-cell' : 'option-value-cell') +'">';
    output += '<input type="' + keyType + '" class="' + (keyType == 'textfield' ? 'form-text ' : '') + 'option-key" value="' + key.replace(/"/g, '&quot;') + '" />';
    output += keyType == 'textfield' ? '</td><td class="option-value-cell">' : '';
    output += '<input class="form-text option-value" type="text" value="' + value.replace(/"/g, '&quot;') + '" />';
    output += '</td><td class="option-actions-cell">'
    output += '<a class="add" title="' + Drupal.t('Add new option') + '" href="#"' + (status == 'disabled' ? ' style="display: none"' : '') + '><span class="add">' + Drupal.t('Add') + '</span></a>';
    output += '<a class="remove" title="' + Drupal.t('Remove option') + '" href="#"' + (status == 'disabled' ? ' style="display: none"' : '') + '><span class="remove">' + Drupal.t('Remove') + '</span></a>';
    output += '</td>';
    output += '</tr>';
    return output;
  }

  output += '<div class="options-widget">';
  output += '<table id="' + optionsElement.identifier + '">';

  output += '<thead><tr>';
  output += '<th>' + (hasDefault ? Drupal.t('Default') : '&nbsp;') + '</th>';
  output += keyType == 'textfield' ? '<th>' + Drupal.t('Key') + '</th>' : '';
  output += '<th>' + Drupal.t('Value') + '</th>';
  output += '<th>&nbsp;</th>';
  output += '</tr></thead>';

  output += '<tbody>';

  // Make sure that at least a few options exist if empty.
  if (!options.length) {
    var newOption = {
      key: '',
      value: '',
      parent: '',
      hasChildren: false,
      checked: false
    }
    options.push(newOption);
    options.push(newOption);
    options.push(newOption);
  }

  for (var n = 0; n < options.length; n++) {
    var option = options[n];
    var depth = option.parent === '' ? 0 : 1;
    var checked = !option.hasChildren && option.checked;
    output += tableDragRow(option.key, option.value, option.parent, depth, checked);
  }

  output += '</tbody>';
  output += '</table>';

  if (optionsElement.defaultValuePattern && optionsElement.manualDefaultValueElement && optionsElement.defaultValuePattern.test(optionsElement.manualDefaultValueElement.value)) {
    output += Drupal.theme('optionsElementPatternMatch', optionsElement.manualDefaultValueElement.value);
  }

  output += '</div>';

  return output;
};

Drupal.theme.prototype.optionsElementPatternMatch = function(matchedValue) {
  return '<div class="default-value-pattern-match"><span>' + Drupal.t('Manual default value') + '</span>: ' + matchedValue + '</div>';
};

Drupal.theme.prototype.optionsElementAdd = function() {
  return '<div class="form-option-add"><a href="#">' + Drupal.t('Add item') + '</a></div>';
};

Drupal.theme.prototype.optionsElementToggle = function() {
  return '<div class="form-options-manual"><a href="#">' + Drupal.t('Manual entry') + '</a></div>';
};

Drupal.theme.tableDragChangedMarker = function () {
  return ' ';
};

Drupal.theme.tableDragChangedWarning = function() {
  return '<span></span>';
};

})(jQuery);
;
(function ($) {

/**
 * Drag and drop table rows with field manipulation.
 *
 * Using the drupal_add_tabledrag() function, any table with weights or parent
 * relationships may be made into draggable tables. Columns containing a field
 * may optionally be hidden, providing a better user experience.
 *
 * Created tableDrag instances may be modified with custom behaviors by
 * overriding the .onDrag, .onDrop, .row.onSwap, and .row.onIndent methods.
 * See blocks.js for an example of adding additional functionality to tableDrag.
 */
Drupal.behaviors.tableDrag = {
  attach: function (context, settings) {
    for (var base in settings.tableDrag) {
      $('#' + base, context).once('tabledrag', function () {
        // Create the new tableDrag instance. Save in the Drupal variable
        // to allow other scripts access to the object.
        Drupal.tableDrag[base] = new Drupal.tableDrag(this, settings.tableDrag[base]);
      });
    }
  }
};

/**
 * Constructor for the tableDrag object. Provides table and field manipulation.
 *
 * @param table
 *   DOM object for the table to be made draggable.
 * @param tableSettings
 *   Settings for the table added via drupal_add_dragtable().
 */
Drupal.tableDrag = function (table, tableSettings) {
  var self = this;

  // Required object variables.
  this.table = table;
  this.tableSettings = tableSettings;
  this.dragObject = null; // Used to hold information about a current drag operation.
  this.rowObject = null; // Provides operations for row manipulation.
  this.oldRowElement = null; // Remember the previous element.
  this.oldY = 0; // Used to determine up or down direction from last mouse move.
  this.changed = false; // Whether anything in the entire table has changed.
  this.maxDepth = 0; // Maximum amount of allowed parenting.
  this.rtl = $(this.table).css('direction') == 'rtl' ? -1 : 1; // Direction of the table.

  // Configure the scroll settings.
  this.scrollSettings = { amount: 4, interval: 50, trigger: 70 };
  this.scrollInterval = null;
  this.scrollY = 0;
  this.windowHeight = 0;

  // Check this table's settings to see if there are parent relationships in
  // this table. For efficiency, large sections of code can be skipped if we
  // don't need to track horizontal movement and indentations.
  this.indentEnabled = false;
  for (var group in tableSettings) {
    for (var n in tableSettings[group]) {
      if (tableSettings[group][n].relationship == 'parent') {
        this.indentEnabled = true;
      }
      if (tableSettings[group][n].limit > 0) {
        this.maxDepth = tableSettings[group][n].limit;
      }
    }
  }
  if (this.indentEnabled) {
    this.indentCount = 1; // Total width of indents, set in makeDraggable.
    // Find the width of indentations to measure mouse movements against.
    // Because the table doesn't need to start with any indentations, we
    // manually append 2 indentations in the first draggable row, measure
    // the offset, then remove.
    var indent = Drupal.theme('tableDragIndentation');
    var testRow = $('<tr/>').addClass('draggable').appendTo(table);
    var testCell = $('<td/>').appendTo(testRow).prepend(indent).prepend(indent);
    this.indentAmount = $('.indentation', testCell).get(1).offsetLeft - $('.indentation', testCell).get(0).offsetLeft;
    testRow.remove();
  }

  // Make each applicable row draggable.
  // Match immediate children of the parent element to allow nesting.
  $('> tr.draggable, > tbody > tr.draggable', table).each(function () { self.makeDraggable(this); });

  // Add a link before the table for users to show or hide weight columns.
  $(table).before($('<a href="#" class="tabledrag-toggle-weight"></a>')
    .attr('title', Drupal.t('Re-order rows by numerical weight instead of dragging.'))
    .click(function () {
      if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
        self.hideColumns();
      }
      else {
        self.showColumns();
      }
      return false;
    })
    .wrap('<div class="tabledrag-toggle-weight-wrapper"></div>')
    .parent()
  );

  // Initialize the specified columns (for example, weight or parent columns)
  // to show or hide according to user preference. This aids accessibility
  // so that, e.g., screen reader users can choose to enter weight values and
  // manipulate form elements directly, rather than using drag-and-drop..
  self.initColumns();

  // Add mouse bindings to the document. The self variable is passed along
  // as event handlers do not have direct access to the tableDrag object.
  $(document).bind('mousemove', function (event) { return self.dragRow(event, self); });
  $(document).bind('mouseup', function (event) { return self.dropRow(event, self); });
};

/**
 * Initialize columns containing form elements to be hidden by default,
 * according to the settings for this tableDrag instance.
 *
 * Identify and mark each cell with a CSS class so we can easily toggle
 * show/hide it. Finally, hide columns if user does not have a
 * 'Drupal.tableDrag.showWeight' cookie.
 */
Drupal.tableDrag.prototype.initColumns = function () {
  for (var group in this.tableSettings) {
    // Find the first field in this group.
    for (var d in this.tableSettings[group]) {
      var field = $('.' + this.tableSettings[group][d].target + ':first', this.table);
      if (field.length && this.tableSettings[group][d].hidden) {
        var hidden = this.tableSettings[group][d].hidden;
        var cell = field.closest('td');
        break;
      }
    }

    // Mark the column containing this field so it can be hidden.
    if (hidden && cell[0]) {
      // Add 1 to our indexes. The nth-child selector is 1 based, not 0 based.
      // Match immediate children of the parent element to allow nesting.
      var columnIndex = $('> td', cell.parent()).index(cell.get(0)) + 1;
      $('> thead > tr, > tbody > tr, > tr', this.table).each(function () {
        // Get the columnIndex and adjust for any colspans in this row.
        var index = columnIndex;
        var cells = $(this).children();
        cells.each(function (n) {
          if (n < index && this.colSpan && this.colSpan > 1) {
            index -= this.colSpan - 1;
          }
        });
        if (index > 0) {
          cell = cells.filter(':nth-child(' + index + ')');
          if (cell[0].colSpan && cell[0].colSpan > 1) {
            // If this cell has a colspan, mark it so we can reduce the colspan.
            cell.addClass('tabledrag-has-colspan');
          }
          else {
            // Mark this cell so we can hide it.
            cell.addClass('tabledrag-hide');
          }
        }
      });
    }
  }

  // Now hide cells and reduce colspans unless cookie indicates previous choice.
  // Set a cookie if it is not already present.
  if ($.cookie('Drupal.tableDrag.showWeight') === null) {
    $.cookie('Drupal.tableDrag.showWeight', 0, {
      path: Drupal.settings.basePath,
      // The cookie expires in one year.
      expires: 365
    });
    this.hideColumns();
  }
  // Check cookie value and show/hide weight columns accordingly.
  else {
    if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
      this.showColumns();
    }
    else {
      this.hideColumns();
    }
  }
};

/**
 * Hide the columns containing weight/parent form elements.
 * Undo showColumns().
 */
Drupal.tableDrag.prototype.hideColumns = function () {
  // Hide weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', 'none');
  // Show TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', '');
  // Reduce the colspan of any effected multi-span columns.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan - 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Drupal.t('Show row weights'));
  // Change cookie.
  $.cookie('Drupal.tableDrag.showWeight', 0, {
    path: Drupal.settings.basePath,
    // The cookie expires in one year.
    expires: 365
  });
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'hide');
};

/**
 * Show the columns containing weight/parent form elements
 * Undo hideColumns().
 */
Drupal.tableDrag.prototype.showColumns = function () {
  // Show weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', '');
  // Hide TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', 'none');
  // Increase the colspan for any columns where it was previously reduced.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan + 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Drupal.t('Hide row weights'));
  // Change cookie.
  $.cookie('Drupal.tableDrag.showWeight', 1, {
    path: Drupal.settings.basePath,
    // The cookie expires in one year.
    expires: 365
  });
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'show');
};

/**
 * Find the target used within a particular row and group.
 */
Drupal.tableDrag.prototype.rowSettings = function (group, row) {
  var field = $('.' + group, row);
  for (var delta in this.tableSettings[group]) {
    var targetClass = this.tableSettings[group][delta].target;
    if (field.is('.' + targetClass)) {
      // Return a copy of the row settings.
      var rowSettings = {};
      for (var n in this.tableSettings[group][delta]) {
        rowSettings[n] = this.tableSettings[group][delta][n];
      }
      return rowSettings;
    }
  }
};

/**
 * Take an item and add event handlers to make it become draggable.
 */
Drupal.tableDrag.prototype.makeDraggable = function (item) {
  var self = this;

  // Create the handle.
  var handle = $('<a href="#" class="tabledrag-handle"><div class="handle">&nbsp;</div></a>').attr('title', Drupal.t('Drag to re-order'));
  // Insert the handle after indentations (if any).
  if ($('td:first .indentation:last', item).length) {
    $('td:first .indentation:last', item).after(handle);
    // Update the total width of indentation in this entire table.
    self.indentCount = Math.max($('.indentation', item).length, self.indentCount);
  }
  else {
    $('td:first', item).prepend(handle);
  }

  // Add hover action for the handle.
  handle.hover(function () {
    self.dragObject == null ? $(this).addClass('tabledrag-handle-hover') : null;
  }, function () {
    self.dragObject == null ? $(this).removeClass('tabledrag-handle-hover') : null;
  });

  // Add the mousedown action for the handle.
  handle.mousedown(function (event) {
    // Create a new dragObject recording the event information.
    self.dragObject = {};
    self.dragObject.initMouseOffset = self.getMouseOffset(item, event);
    self.dragObject.initMouseCoords = self.mouseCoords(event);
    if (self.indentEnabled) {
      self.dragObject.indentMousePos = self.dragObject.initMouseCoords;
    }

    // If there's a lingering row object from the keyboard, remove its focus.
    if (self.rowObject) {
      $('a.tabledrag-handle', self.rowObject.element).blur();
    }

    // Create a new rowObject for manipulation of this row.
    self.rowObject = new self.row(item, 'mouse', self.indentEnabled, self.maxDepth, true);

    // Save the position of the table.
    self.table.topY = $(self.table).offset().top;
    self.table.bottomY = self.table.topY + self.table.offsetHeight;

    // Add classes to the handle and row.
    $(this).addClass('tabledrag-handle-hover');
    $(item).addClass('drag');

    // Set the document to use the move cursor during drag.
    $('body').addClass('drag');
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }

    // Hack for IE6 that flickers uncontrollably if select lists are moved.
    if (navigator.userAgent.indexOf('MSIE 6.') != -1) {
      $('select', this.table).css('display', 'none');
    }

    // Hack for Konqueror, prevent the blur handler from firing.
    // Konqueror always gives links focus, even after returning false on mousedown.
    self.safeBlur = false;

    // Call optional placeholder function.
    self.onDrag();
    return false;
  });

  // Prevent the anchor tag from jumping us to the top of the page.
  handle.click(function () {
    return false;
  });

  // Similar to the hover event, add a class when the handle is focused.
  handle.focus(function () {
    $(this).addClass('tabledrag-handle-hover');
    self.safeBlur = true;
  });

  // Remove the handle class on blur and fire the same function as a mouseup.
  handle.blur(function (event) {
    $(this).removeClass('tabledrag-handle-hover');
    if (self.rowObject && self.safeBlur) {
      self.dropRow(event, self);
    }
  });

  // Add arrow-key support to the handle.
  handle.keydown(function (event) {
    // If a rowObject doesn't yet exist and this isn't the tab key.
    if (event.keyCode != 9 && !self.rowObject) {
      self.rowObject = new self.row(item, 'keyboard', self.indentEnabled, self.maxDepth, true);
    }

    var keyChange = false;
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 63234: // Safari left arrow.
        keyChange = true;
        self.rowObject.indent(-1 * self.rtl);
        break;
      case 38: // Up arrow.
      case 63232: // Safari up arrow.
        var previousRow = $(self.rowObject.element).prev('tr').get(0);
        while (previousRow && $(previousRow).is(':hidden')) {
          previousRow = $(previousRow).prev('tr').get(0);
        }
        if (previousRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'up';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the previous top-level row.
            var groupHeight = 0;
            while (previousRow && $('.indentation', previousRow).length) {
              previousRow = $(previousRow).prev('tr').get(0);
              groupHeight += $(previousRow).is(':hidden') ? 0 : previousRow.offsetHeight;
            }
            if (previousRow) {
              self.rowObject.swap('before', previousRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, -groupHeight);
            }
          }
          else if (self.table.tBodies[0].rows[0] != previousRow || $(previousRow).is('.draggable')) {
            // Swap with the previous row (unless previous row is the first one
            // and undraggable).
            self.rowObject.swap('before', previousRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, -parseInt(item.offsetHeight, 10));
          }
          handle.get(0).focus(); // Regain focus after the DOM manipulation.
        }
        break;
      case 39: // Right arrow.
      case 63235: // Safari right arrow.
        keyChange = true;
        self.rowObject.indent(1 * self.rtl);
        break;
      case 40: // Down arrow.
      case 63233: // Safari down arrow.
        var nextRow = $(self.rowObject.group).filter(':last').next('tr').get(0);
        while (nextRow && $(nextRow).is(':hidden')) {
          nextRow = $(nextRow).next('tr').get(0);
        }
        if (nextRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'down';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the next group (necessarily a top-level one).
            var groupHeight = 0;
            var nextGroup = new self.row(nextRow, 'keyboard', self.indentEnabled, self.maxDepth, false);
            if (nextGroup) {
              $(nextGroup.group).each(function () {
                groupHeight += $(this).is(':hidden') ? 0 : this.offsetHeight;
              });
              var nextGroupRow = $(nextGroup.group).filter(':last').get(0);
              self.rowObject.swap('after', nextGroupRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, parseInt(groupHeight, 10));
            }
          }
          else {
            // Swap with the next row.
            self.rowObject.swap('after', nextRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, parseInt(item.offsetHeight, 10));
          }
          handle.get(0).focus(); // Regain focus after the DOM manipulation.
        }
        break;
    }

    if (self.rowObject && self.rowObject.changed == true) {
      $(item).addClass('drag');
      if (self.oldRowElement) {
        $(self.oldRowElement).removeClass('drag-previous');
      }
      self.oldRowElement = item;
      self.restripeTable();
      self.onDrag();
    }

    // Returning false if we have an arrow key to prevent scrolling.
    if (keyChange) {
      return false;
    }
  });

  // Compatibility addition, return false on keypress to prevent unwanted scrolling.
  // IE and Safari will suppress scrolling on keydown, but all other browsers
  // need to return false on keypress. http://www.quirksmode.org/js/keys.html
  handle.keypress(function (event) {
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 38: // Up arrow.
      case 39: // Right arrow.
      case 40: // Down arrow.
        return false;
    }
  });
};

/**
 * Mousemove event handler, bound to document.
 */
Drupal.tableDrag.prototype.dragRow = function (event, self) {
  if (self.dragObject) {
    self.currentMouseCoords = self.mouseCoords(event);

    var y = self.currentMouseCoords.y - self.dragObject.initMouseOffset.y;
    var x = self.currentMouseCoords.x - self.dragObject.initMouseOffset.x;

    // Check for row swapping and vertical scrolling.
    if (y != self.oldY) {
      self.rowObject.direction = y > self.oldY ? 'down' : 'up';
      self.oldY = y; // Update the old value.

      // Check if the window should be scrolled (and how fast).
      var scrollAmount = self.checkScroll(self.currentMouseCoords.y);
      // Stop any current scrolling.
      clearInterval(self.scrollInterval);
      // Continue scrolling if the mouse has moved in the scroll direction.
      if (scrollAmount > 0 && self.rowObject.direction == 'down' || scrollAmount < 0 && self.rowObject.direction == 'up') {
        self.setScroll(scrollAmount);
      }

      // If we have a valid target, perform the swap and restripe the table.
      var currentRow = self.findDropTargetRow(x, y);
      if (currentRow) {
        if (self.rowObject.direction == 'down') {
          self.rowObject.swap('after', currentRow, self);
        }
        else {
          self.rowObject.swap('before', currentRow, self);
        }
        self.restripeTable();
      }
    }

    // Similar to row swapping, handle indentations.
    if (self.indentEnabled) {
      var xDiff = self.currentMouseCoords.x - self.dragObject.indentMousePos.x;
      // Set the number of indentations the mouse has been moved left or right.
      var indentDiff = Math.round(xDiff / self.indentAmount * self.rtl);
      // Indent the row with our estimated diff, which may be further
      // restricted according to the rows around this row.
      var indentChange = self.rowObject.indent(indentDiff);
      // Update table and mouse indentations.
      self.dragObject.indentMousePos.x += self.indentAmount * indentChange * self.rtl;
      self.indentCount = Math.max(self.indentCount, self.rowObject.indents);
    }

    return false;
  }
};

/**
 * Mouseup event handler, bound to document.
 * Blur event handler, bound to drag handle for keyboard support.
 */
Drupal.tableDrag.prototype.dropRow = function (event, self) {
  // Drop row functionality shared between mouseup and blur events.
  if (self.rowObject != null) {
    var droppedRow = self.rowObject.element;
    // The row is already in the right place so we just release it.
    if (self.rowObject.changed == true) {
      // Update the fields in the dropped row.
      self.updateFields(droppedRow);

      // If a setting exists for affecting the entire group, update all the
      // fields in the entire dragged group.
      for (var group in self.tableSettings) {
        var rowSettings = self.rowSettings(group, droppedRow);
        if (rowSettings.relationship == 'group') {
          for (var n in self.rowObject.children) {
            self.updateField(self.rowObject.children[n], group);
          }
        }
      }

      self.rowObject.markChanged();
      if (self.changed == false) {
        $(Drupal.theme('tableDragChangedWarning')).insertBefore(self.table).hide().fadeIn('slow');
        self.changed = true;
      }
    }

    if (self.indentEnabled) {
      self.rowObject.removeIndentClasses();
    }
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }
    $(droppedRow).removeClass('drag').addClass('drag-previous');
    self.oldRowElement = droppedRow;
    self.onDrop();
    self.rowObject = null;
  }

  // Functionality specific only to mouseup event.
  if (self.dragObject != null) {
    $('.tabledrag-handle', droppedRow).removeClass('tabledrag-handle-hover');

    self.dragObject = null;
    $('body').removeClass('drag');
    clearInterval(self.scrollInterval);

    // Hack for IE6 that flickers uncontrollably if select lists are moved.
    if (navigator.userAgent.indexOf('MSIE 6.') != -1) {
      $('select', this.table).css('display', 'block');
    }
  }
};

/**
 * Get the mouse coordinates from the event (allowing for browser differences).
 */
Drupal.tableDrag.prototype.mouseCoords = function (event) {
  if (event.pageX || event.pageY) {
    return { x: event.pageX, y: event.pageY };
  }
  return {
    x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: event.clientY + document.body.scrollTop  - document.body.clientTop
  };
};

/**
 * Given a target element and a mouse event, get the mouse offset from that
 * element. To do this we need the element's position and the mouse position.
 */
Drupal.tableDrag.prototype.getMouseOffset = function (target, event) {
  var docPos   = $(target).offset();
  var mousePos = this.mouseCoords(event);
  return { x: mousePos.x - docPos.left, y: mousePos.y - docPos.top };
};

/**
 * Find the row the mouse is currently over. This row is then taken and swapped
 * with the one being dragged.
 *
 * @param x
 *   The x coordinate of the mouse on the page (not the screen).
 * @param y
 *   The y coordinate of the mouse on the page (not the screen).
 */
Drupal.tableDrag.prototype.findDropTargetRow = function (x, y) {
  var rows = $(this.table.tBodies[0].rows).not(':hidden');
  for (var n = 0; n < rows.length; n++) {
    var row = rows[n];
    var indentDiff = 0;
    var rowY = $(row).offset().top;
    // Because Safari does not report offsetHeight on table rows, but does on
    // table cells, grab the firstChild of the row and use that instead.
    // http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari.
    if (row.offsetHeight == 0) {
      var rowHeight = parseInt(row.firstChild.offsetHeight, 10) / 2;
    }
    // Other browsers.
    else {
      var rowHeight = parseInt(row.offsetHeight, 10) / 2;
    }

    // Because we always insert before, we need to offset the height a bit.
    if ((y > (rowY - rowHeight)) && (y < (rowY + rowHeight))) {
      if (this.indentEnabled) {
        // Check that this row is not a child of the row being dragged.
        for (var n in this.rowObject.group) {
          if (this.rowObject.group[n] == row) {
            return null;
          }
        }
      }
      else {
        // Do not allow a row to be swapped with itself.
        if (row == this.rowObject.element) {
          return null;
        }
      }

      // Check that swapping with this row is allowed.
      if (!this.rowObject.isValidSwap(row)) {
        return null;
      }

      // We may have found the row the mouse just passed over, but it doesn't
      // take into account hidden rows. Skip backwards until we find a draggable
      // row.
      while ($(row).is(':hidden') && $(row).prev('tr').is(':hidden')) {
        row = $(row).prev('tr').get(0);
      }
      return row;
    }
  }
  return null;
};

/**
 * After the row is dropped, update the table fields according to the settings
 * set for this table.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 */
Drupal.tableDrag.prototype.updateFields = function (changedRow) {
  for (var group in this.tableSettings) {
    // Each group may have a different setting for relationship, so we find
    // the source rows for each separately.
    this.updateField(changedRow, group);
  }
};

/**
 * After the row is dropped, update a single table field according to specific
 * settings.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 * @param group
 *   The settings group on which field updates will occur.
 */
Drupal.tableDrag.prototype.updateField = function (changedRow, group) {
  var rowSettings = this.rowSettings(group, changedRow);

  // Set the row as its own target.
  if (rowSettings.relationship == 'self' || rowSettings.relationship == 'group') {
    var sourceRow = changedRow;
  }
  // Siblings are easy, check previous and next rows.
  else if (rowSettings.relationship == 'sibling') {
    var previousRow = $(changedRow).prev('tr').get(0);
    var nextRow = $(changedRow).next('tr').get(0);
    var sourceRow = changedRow;
    if ($(previousRow).is('.draggable') && $('.' + group, previousRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', previousRow).length == $('.indentations', changedRow)) {
          sourceRow = previousRow;
        }
      }
      else {
        sourceRow = previousRow;
      }
    }
    else if ($(nextRow).is('.draggable') && $('.' + group, nextRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', nextRow).length == $('.indentations', changedRow)) {
          sourceRow = nextRow;
        }
      }
      else {
        sourceRow = nextRow;
      }
    }
  }
  // Parents, look up the tree until we find a field not in this group.
  // Go up as many parents as indentations in the changed row.
  else if (rowSettings.relationship == 'parent') {
    var previousRow = $(changedRow).prev('tr');
    while (previousRow.length && $('.indentation', previousRow).length >= this.rowObject.indents) {
      previousRow = previousRow.prev('tr');
    }
    // If we found a row.
    if (previousRow.length) {
      sourceRow = previousRow[0];
    }
    // Otherwise we went all the way to the left of the table without finding
    // a parent, meaning this item has been placed at the root level.
    else {
      // Use the first row in the table as source, because it's guaranteed to
      // be at the root level. Find the first item, then compare this row
      // against it as a sibling.
      sourceRow = $(this.table).find('tr.draggable:first').get(0);
      if (sourceRow == this.rowObject.element) {
        sourceRow = $(this.rowObject.group[this.rowObject.group.length - 1]).next('tr.draggable').get(0);
      }
      var useSibling = true;
    }
  }

  // Because we may have moved the row from one category to another,
  // take a look at our sibling and borrow its sources and targets.
  this.copyDragClasses(sourceRow, changedRow, group);
  rowSettings = this.rowSettings(group, changedRow);

  // In the case that we're looking for a parent, but the row is at the top
  // of the tree, copy our sibling's values.
  if (useSibling) {
    rowSettings.relationship = 'sibling';
    rowSettings.source = rowSettings.target;
  }

  var targetClass = '.' + rowSettings.target;
  var targetElement = $(targetClass, changedRow).get(0);

  // Check if a target element exists in this row.
  if (targetElement) {
    var sourceClass = '.' + rowSettings.source;
    var sourceElement = $(sourceClass, sourceRow).get(0);
    switch (rowSettings.action) {
      case 'depth':
        // Get the depth of the target row.
        targetElement.value = $('.indentation', $(sourceElement).closest('tr')).length;
        break;
      case 'match':
        // Update the value.
        targetElement.value = sourceElement.value;
        break;
      case 'order':
        var siblings = this.rowObject.findSiblings(rowSettings);
        if ($(targetElement).is('select')) {
          // Get a list of acceptable values.
          var values = [];
          $('option', targetElement).each(function () {
            values.push(this.value);
          });
          var maxVal = values[values.length - 1];
          // Populate the values in the siblings.
          $(targetClass, siblings).each(function () {
            // If there are more items than possible values, assign the maximum value to the row.
            if (values.length > 0) {
              this.value = values.shift();
            }
            else {
              this.value = maxVal;
            }
          });
        }
        else {
          // Assume a numeric input field.
          var weight = parseInt($(targetClass, siblings[0]).val(), 10) || 0;
          $(targetClass, siblings).each(function () {
            this.value = weight;
            weight++;
          });
        }
        break;
    }
  }
};

/**
 * Copy all special tableDrag classes from one row's form elements to a
 * different one, removing any special classes that the destination row
 * may have had.
 */
Drupal.tableDrag.prototype.copyDragClasses = function (sourceRow, targetRow, group) {
  var sourceElement = $('.' + group, sourceRow);
  var targetElement = $('.' + group, targetRow);
  if (sourceElement.length && targetElement.length) {
    targetElement[0].className = sourceElement[0].className;
  }
};

Drupal.tableDrag.prototype.checkScroll = function (cursorY) {
  var de  = document.documentElement;
  var b  = document.body;

  var windowHeight = this.windowHeight = window.innerHeight || (de.clientHeight && de.clientWidth != 0 ? de.clientHeight : b.offsetHeight);
  var scrollY = this.scrollY = (document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY));
  var trigger = this.scrollSettings.trigger;
  var delta = 0;

  // Return a scroll speed relative to the edge of the screen.
  if (cursorY - scrollY > windowHeight - trigger) {
    delta = trigger / (windowHeight + scrollY - cursorY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return delta * this.scrollSettings.amount;
  }
  else if (cursorY - scrollY < trigger) {
    delta = trigger / (cursorY - scrollY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return -delta * this.scrollSettings.amount;
  }
};

Drupal.tableDrag.prototype.setScroll = function (scrollAmount) {
  var self = this;

  this.scrollInterval = setInterval(function () {
    // Update the scroll values stored in the object.
    self.checkScroll(self.currentMouseCoords.y);
    var aboveTable = self.scrollY > self.table.topY;
    var belowTable = self.scrollY + self.windowHeight < self.table.bottomY;
    if (scrollAmount > 0 && belowTable || scrollAmount < 0 && aboveTable) {
      window.scrollBy(0, scrollAmount);
    }
  }, this.scrollSettings.interval);
};

Drupal.tableDrag.prototype.restripeTable = function () {
  // :even and :odd are reversed because jQuery counts from 0 and
  // we count from 1, so we're out of sync.
  // Match immediate children of the parent element to allow nesting.
  $('> tbody > tr.draggable:visible, > tr.draggable:visible', this.table)
    .removeClass('odd even')
    .filter(':odd').addClass('even').end()
    .filter(':even').addClass('odd');
};

/**
 * Stub function. Allows a custom handler when a row begins dragging.
 */
Drupal.tableDrag.prototype.onDrag = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is dropped.
 */
Drupal.tableDrag.prototype.onDrop = function () {
  return null;
};

/**
 * Constructor to make a new object to manipulate a table row.
 *
 * @param tableRow
 *   The DOM element for the table row we will be manipulating.
 * @param method
 *   The method in which this row is being moved. Either 'keyboard' or 'mouse'.
 * @param indentEnabled
 *   Whether the containing table uses indentations. Used for optimizations.
 * @param maxDepth
 *   The maximum amount of indentations this row may contain.
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Drupal.tableDrag.prototype.row = function (tableRow, method, indentEnabled, maxDepth, addClasses) {
  this.element = tableRow;
  this.method = method;
  this.group = [tableRow];
  this.groupDepth = $('.indentation', tableRow).length;
  this.changed = false;
  this.table = $(tableRow).closest('table').get(0);
  this.indentEnabled = indentEnabled;
  this.maxDepth = maxDepth;
  this.direction = ''; // Direction the row is being moved.

  if (this.indentEnabled) {
    this.indents = $('.indentation', tableRow).length;
    this.children = this.findChildren(addClasses);
    this.group = $.merge(this.group, this.children);
    // Find the depth of this entire group.
    for (var n = 0; n < this.group.length; n++) {
      this.groupDepth = Math.max($('.indentation', this.group[n]).length, this.groupDepth);
    }
  }
};

/**
 * Find all children of rowObject by indentation.
 *
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Drupal.tableDrag.prototype.row.prototype.findChildren = function (addClasses) {
  var parentIndentation = this.indents;
  var currentRow = $(this.element, this.table).next('tr.draggable');
  var rows = [];
  var child = 0;
  while (currentRow.length) {
    var rowIndentation = $('.indentation', currentRow).length;
    // A greater indentation indicates this is a child.
    if (rowIndentation > parentIndentation) {
      child++;
      rows.push(currentRow[0]);
      if (addClasses) {
        $('.indentation', currentRow).each(function (indentNum) {
          if (child == 1 && (indentNum == parentIndentation)) {
            $(this).addClass('tree-child-first');
          }
          if (indentNum == parentIndentation) {
            $(this).addClass('tree-child');
          }
          else if (indentNum > parentIndentation) {
            $(this).addClass('tree-child-horizontal');
          }
        });
      }
    }
    else {
      break;
    }
    currentRow = currentRow.next('tr.draggable');
  }
  if (addClasses && rows.length) {
    $('.indentation:nth-child(' + (parentIndentation + 1) + ')', rows[rows.length - 1]).addClass('tree-child-last');
  }
  return rows;
};

/**
 * Ensure that two rows are allowed to be swapped.
 *
 * @param row
 *   DOM object for the row being considered for swapping.
 */
Drupal.tableDrag.prototype.row.prototype.isValidSwap = function (row) {
  if (this.indentEnabled) {
    var prevRow, nextRow;
    if (this.direction == 'down') {
      prevRow = row;
      nextRow = $(row).next('tr').get(0);
    }
    else {
      prevRow = $(row).prev('tr').get(0);
      nextRow = row;
    }
    this.interval = this.validIndentInterval(prevRow, nextRow);

    // We have an invalid swap if the valid indentations interval is empty.
    if (this.interval.min > this.interval.max) {
      return false;
    }
  }

  // Do not let an un-draggable first row have anything put before it.
  if (this.table.tBodies[0].rows[0] == row && $(row).is(':not(.draggable)')) {
    return false;
  }

  return true;
};

/**
 * Perform the swap between two rows.
 *
 * @param position
 *   Whether the swap will occur 'before' or 'after' the given row.
 * @param row
 *   DOM element what will be swapped with the row group.
 */
Drupal.tableDrag.prototype.row.prototype.swap = function (position, row) {
  Drupal.detachBehaviors(this.group, Drupal.settings, 'move');
  $(row)[position](this.group);
  Drupal.attachBehaviors(this.group, Drupal.settings);
  this.changed = true;
  this.onSwap(row);
};

/**
 * Determine the valid indentations interval for the row at a given position
 * in the table.
 *
 * @param prevRow
 *   DOM object for the row before the tested position
 *   (or null for first position in the table).
 * @param nextRow
 *   DOM object for the row after the tested position
 *   (or null for last position in the table).
 */
Drupal.tableDrag.prototype.row.prototype.validIndentInterval = function (prevRow, nextRow) {
  var minIndent, maxIndent;

  // Minimum indentation:
  // Do not orphan the next row.
  minIndent = nextRow ? $('.indentation', nextRow).length : 0;

  // Maximum indentation:
  if (!prevRow || $(prevRow).is(':not(.draggable)') || $(this.element).is('.tabledrag-root')) {
    // Do not indent:
    // - the first row in the table,
    // - rows dragged below a non-draggable row,
    // - 'root' rows.
    maxIndent = 0;
  }
  else {
    // Do not go deeper than as a child of the previous row.
    maxIndent = $('.indentation', prevRow).length + ($(prevRow).is('.tabledrag-leaf') ? 0 : 1);
    // Limit by the maximum allowed depth for the table.
    if (this.maxDepth) {
      maxIndent = Math.min(maxIndent, this.maxDepth - (this.groupDepth - this.indents));
    }
  }

  return { 'min': minIndent, 'max': maxIndent };
};

/**
 * Indent a row within the legal bounds of the table.
 *
 * @param indentDiff
 *   The number of additional indentations proposed for the row (can be
 *   positive or negative). This number will be adjusted to nearest valid
 *   indentation level for the row.
 */
Drupal.tableDrag.prototype.row.prototype.indent = function (indentDiff) {
  // Determine the valid indentations interval if not available yet.
  if (!this.interval) {
    var prevRow = $(this.element).prev('tr').get(0);
    var nextRow = $(this.group).filter(':last').next('tr').get(0);
    this.interval = this.validIndentInterval(prevRow, nextRow);
  }

  // Adjust to the nearest valid indentation.
  var indent = this.indents + indentDiff;
  indent = Math.max(indent, this.interval.min);
  indent = Math.min(indent, this.interval.max);
  indentDiff = indent - this.indents;

  for (var n = 1; n <= Math.abs(indentDiff); n++) {
    // Add or remove indentations.
    if (indentDiff < 0) {
      $('.indentation:first', this.group).remove();
      this.indents--;
    }
    else {
      $('td:first', this.group).prepend(Drupal.theme('tableDragIndentation'));
      this.indents++;
    }
  }
  if (indentDiff) {
    // Update indentation for this row.
    this.changed = true;
    this.groupDepth += indentDiff;
    this.onIndent();
  }

  return indentDiff;
};

/**
 * Find all siblings for a row, either according to its subgroup or indentation.
 * Note that the passed-in row is included in the list of siblings.
 *
 * @param settings
 *   The field settings we're using to identify what constitutes a sibling.
 */
Drupal.tableDrag.prototype.row.prototype.findSiblings = function (rowSettings) {
  var siblings = [];
  var directions = ['prev', 'next'];
  var rowIndentation = this.indents;
  for (var d = 0; d < directions.length; d++) {
    var checkRow = $(this.element)[directions[d]]();
    while (checkRow.length) {
      // Check that the sibling contains a similar target field.
      if ($('.' + rowSettings.target, checkRow)) {
        // Either add immediately if this is a flat table, or check to ensure
        // that this row has the same level of indentation.
        if (this.indentEnabled) {
          var checkRowIndentation = $('.indentation', checkRow).length;
        }

        if (!(this.indentEnabled) || (checkRowIndentation == rowIndentation)) {
          siblings.push(checkRow[0]);
        }
        else if (checkRowIndentation < rowIndentation) {
          // No need to keep looking for siblings when we get to a parent.
          break;
        }
      }
      else {
        break;
      }
      checkRow = $(checkRow)[directions[d]]();
    }
    // Since siblings are added in reverse order for previous, reverse the
    // completed list of previous siblings. Add the current row and continue.
    if (directions[d] == 'prev') {
      siblings.reverse();
      siblings.push(this.element);
    }
  }
  return siblings;
};

/**
 * Remove indentation helper classes from the current row group.
 */
Drupal.tableDrag.prototype.row.prototype.removeIndentClasses = function () {
  for (var n in this.children) {
    $('.indentation', this.children[n])
      .removeClass('tree-child')
      .removeClass('tree-child-first')
      .removeClass('tree-child-last')
      .removeClass('tree-child-horizontal');
  }
};

/**
 * Add an asterisk or other marker to the changed row.
 */
Drupal.tableDrag.prototype.row.prototype.markChanged = function () {
  var marker = Drupal.theme('tableDragChangedMarker');
  var cell = $('td:first', this.element);
  if ($('span.tabledrag-changed', cell).length == 0) {
    cell.append(marker);
  }
};

/**
 * Stub function. Allows a custom handler when a row is indented.
 */
Drupal.tableDrag.prototype.row.prototype.onIndent = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is swapped.
 */
Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
  return null;
};

Drupal.theme.prototype.tableDragChangedMarker = function () {
  return '<span class="warning tabledrag-changed">*</span>';
};

Drupal.theme.prototype.tableDragIndentation = function () {
  return '<div class="indentation">&nbsp;</div>';
};

Drupal.theme.prototype.tableDragChangedWarning = function () {
  return '<div class="tabledrag-changed-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
};

})(jQuery);
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.drupalSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attach the machine-readable name form element behavior.
 */
Drupal.behaviors.machineName = {
  /**
   * Attaches the behavior.
   *
   * @param settings.machineName
   *   A list of elements to process, keyed by the HTML ID of the form element
   *   containing the human-readable value. Each element is an object defining
   *   the following properties:
   *   - target: The HTML ID of the machine name form element.
   *   - suffix: The HTML ID of a container to show the machine name preview in
   *     (usually a field suffix after the human-readable name form element).
   *   - label: The label to show for the machine name preview.
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - standalone: Whether the preview should stay in its own element rather
   *     than the suffix of the source element.
   *   - field_prefix: The #field_prefix of the form element.
   *   - field_suffix: The #field_suffix of the form element.
   */
  attach: function (context, settings) {
    var self = this;
    $.each(settings.machineName, function (source_id, options) {
      var $source = $(source_id, context).addClass('machine-name-source');
      var $target = $(options.target, context).addClass('machine-name-target');
      var $suffix = $(options.suffix, context);
      var $wrapper = $target.closest('.form-item');
      // All elements have to exist.
      if (!$source.length || !$target.length || !$suffix.length || !$wrapper.length) {
        return;
      }
      // Skip processing upon a form validation error on the machine name.
      if ($target.hasClass('error')) {
        return;
      }
      // Figure out the maximum length for the machine name.
      options.maxlength = $target.attr('maxlength');
      // Hide the form item container of the machine name form element.
      $wrapper.hide();
      // Determine the initial machine name value. Unless the machine name form
      // element is disabled or not empty, the initial default value is based on
      // the human-readable form element value.
      if ($target.is(':disabled') || $target.val() != '') {
        var machine = $target.val();
      }
      else {
        var machine = self.transliterate($source.val(), options);
      }
      // Append the machine name preview to the source field.
      var $preview = $('<span class="machine-name-value">' + options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix + '</span>');
      $suffix.empty();
      if (options.label) {
        $suffix.append(' ').append('<span class="machine-name-label">' + options.label + ':</span>');
      }
      $suffix.append(' ').append($preview);

      // If the machine name cannot be edited, stop further processing.
      if ($target.is(':disabled')) {
        return;
      }

      // If it is editable, append an edit link.
      var $link = $('<span class="admin-link"><a href="#">' + Drupal.t('Edit') + '</a></span>')
        .click(function () {
          $wrapper.show();
          $target.focus();
          $suffix.hide();
          $source.unbind('.machineName');
          return false;
        });
      $suffix.append(' ').append($link);

      // Preview the machine name in realtime when the human-readable name
      // changes, but only if there is no machine name yet; i.e., only upon
      // initial creation, not when editing.
      if ($target.val() == '') {
        $source.bind('keyup.machineName change.machineName input.machineName', function () {
          machine = self.transliterate($(this).val(), options);
          // Set the machine name to the transliterated value.
          if (machine != '') {
            if (machine != options.replace) {
              $target.val(machine);
              $preview.html(options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix);
            }
            $suffix.show();
          }
          else {
            $suffix.hide();
            $target.val(machine);
            $preview.empty();
          }
        });
        // Initialize machine name preview.
        $source.keyup();
      }
    });
  },

  /**
   * Transliterate a human-readable name to a machine name.
   *
   * @param source
   *   A string to transliterate.
   * @param settings
   *   The machine name settings for the corresponding field, containing:
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - maxlength: The maximum length of the machine name.
   *
   * @return
   *   The transliterated source string.
   */
  transliterate: function (source, settings) {
    var rx = new RegExp(settings.replace_pattern, 'g');
    return source.toLowerCase().replace(rx, settings.replace).substr(0, settings.maxlength);
  }
};

})(jQuery);
;
