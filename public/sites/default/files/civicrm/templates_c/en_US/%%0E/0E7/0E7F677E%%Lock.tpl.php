<?php /* Smarty version 2.6.27, created on 2013-08-07 13:28:15
         compiled from CRM/Contact/Form/Edit/Lock.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/Contact/Form/Edit/Lock.tpl', 10, false),)), $this); ?>
<?php echo '
<script type="text/javascript">
cj(function() {
  if (cj(\'#update_modified_date\').length == 0) {
    return;
  }
  cj(\'<br>\')
    .appendTo(cj(\'#update_modified_date\'));
  cj(\'<button>\')
    .text("'; ?>
<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Save Anyway<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '")
    .click(function() {
      cj(\'input[name="modified_date"]\').val(
              cj(\'#update_modified_date\').attr(\'data:latest_modified_date\')
      );
      cj(\'.crm-form-block .form-submit.default\').first().click();
      return false;
    })
    .appendTo(cj(\'#update_modified_date\'))
    ;
  cj(\'<button>\')
    .text("'; ?>
<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Reload Page<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '")
    .click(function() {
      window.location = CRM.url(\'civicrm/contact/add\', {
        reset: 1,
        action: \'update\',
        cid: '; ?>
<?php echo $this->_tpl_vars['contactId']; ?>
<?php echo '
      });
      return false;
    })
    .appendTo(cj(\'#update_modified_date\'))
    ;
});
</script>
'; ?>