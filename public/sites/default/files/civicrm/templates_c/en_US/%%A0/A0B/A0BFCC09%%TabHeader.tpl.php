<?php /* Smarty version 2.6.27, created on 2013-08-06 21:42:58
         compiled from CRM/common/TabHeader.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/common/TabHeader.tpl', 38, false),)), $this); ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/wysiwyg.tpl", 'smarty_include_vars' => array('includeWysiwygEditor' => true)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div class="crm-block crm-content-block">
  <?php if ($this->_tpl_vars['tabHeader'] && count ( $this->_tpl_vars['tabHeader'] ) > 1): ?>
    <div id="mainTabContainer">
    <ul>
       <?php $_from = $this->_tpl_vars['tabHeader']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tabName'] => $this->_tpl_vars['tabValue']):
?>
          <li id="tab_<?php echo $this->_tpl_vars['tabName']; ?>
" class="crm-tab-button ui-corner-all <?php if (! $this->_tpl_vars['tabValue']['valid']): ?>disabled<?php endif; ?>">
          <?php if ($this->_tpl_vars['tabValue']['link'] && $this->_tpl_vars['tabValue']['active']): ?>
             <a href="<?php echo $this->_tpl_vars['tabValue']['link']; ?>
" title="<?php echo $this->_tpl_vars['tabValue']['title']; ?>
<?php if (! $this->_tpl_vars['tabValue']['valid']): ?> (<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>disabled<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>)<?php endif; ?>"><?php echo $this->_tpl_vars['tabValue']['title']; ?>
</a>
          <?php else: ?>
             <span <?php if (! $this->_tpl_vars['tabValue']['valid']): ?> title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>disabled<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"<?php endif; ?>><?php echo $this->_tpl_vars['tabValue']['title']; ?>
</span>
          <?php endif; ?>
          </li>
       <?php endforeach; endif; unset($_from); ?>
    </ul>
    </div>
  <?php endif; ?>
  <div class="clear"></div>
</div> 
<script type="text/javascript">
   var selectedTab = 'EventInfo';
   <?php if ($this->_tpl_vars['selectedTab']): ?>selectedTab = "<?php echo $this->_tpl_vars['selectedTab']; ?>
";<?php endif; ?>
   var spinnerImage = '<img src="<?php echo $this->_tpl_vars['config']->resourceBase; ?>
i/loading.gif" style="width:10px;height:10px"/>';
<?php echo '

cj( function() {
    var tabIndex = cj(\'#tab_\' + selectedTab).prevAll().length
    cj("#mainTabContainer").tabs( {
        selected: tabIndex,
        spinner: spinnerImage,
        select: function(event, ui) {
            // we need to change the action of parent form, so that form submits to correct page
            var url = ui.tab.href;

            '; ?>
<?php if ($this->_tpl_vars['config']->userSystem->is_drupal): ?><?php echo '
                var actionUrl = url.split( \'?\' );
                '; ?>
<?php if ($this->_tpl_vars['config']->cleanURL): ?><?php echo '
                  var actualUrl = actionUrl[0];
                '; ?>
<?php else: ?><?php echo '
                  var getParams = actionUrl[1].split( \'&\' );
                  var actualUrl = actionUrl[0] + \'?\' + getParams[0];
                '; ?>
<?php endif; ?><?php echo '
            '; ?>
<?php else: ?><?php echo '
                var actionUrl = url.split( \'&\' );
                var actualUrl = actionUrl[0] + \'&\' + actionUrl[1];
            '; ?>
<?php endif; ?><?php echo '

            if ( !global_formNavigate ) {
              var message = \''; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Are you sure you want to navigate away from this tab?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>' + '\n\n' + '<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>You have unsaved changes.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>' + '\n\n' + '<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Press OK to continue, or Cancel to stay on the current tab.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '\';
              if ( !confirm( message ) ) {
                return false;
              } else {
                global_formNavigate = true;
              }
            }
            cj(this).parents("form").attr("action", actualUrl );

            return true;
        },
        load: function(event, ui) {
          if ((typeof(Drupal) != \'undefined\') && Drupal.attachBehaviors) {
            Drupal.attachBehaviors(ui.panel);
          }
          cj(ui.panel).trigger(\'crmFormLoad\');
          // FIXME - decouple scanProfileSelectors and TabHeader
          if (CRM.scanProfileSelectors) {
            CRM.scanProfileSelectors();
          }
        }
    });
});
'; ?>

</script>
