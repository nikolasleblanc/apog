<?php /* Smarty version 2.6.27, created on 2013-08-06 21:50:28
         compiled from CRM/Event/Form/ManageEvent/Registration.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/Event/Form/ManageEvent/Registration.tpl', 31, false),array('function', 'help', 'CRM/Event/Form/ManageEvent/Registration.tpl', 53, false),array('function', 'crmURL', 'CRM/Event/Form/ManageEvent/Registration.tpl', 197, false),array('modifier', 'crmAddClass', 'CRM/Event/Form/ManageEvent/Registration.tpl', 110, false),array('modifier', 'count', 'CRM/Event/Form/ManageEvent/Registration.tpl', 373, false),)), $this); ?>
<?php if ($this->_tpl_vars['addProfileBottomAdd'] || $this->_tpl_vars['addProfileBottom']): ?>
  <?php if ($this->_tpl_vars['addProfileBottomAdd']): ?>
    <tr class="crm-event-manage-registration-form-block-additional_custom_post_<?php echo $this->_tpl_vars['profileBottomNumAdd']; ?>
">
      <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['additional_custom_post_id_multiple'][$this->_tpl_vars['profileBottomNumAdd']]['label']; ?>
</td>
      <td><?php echo $this->_tpl_vars['form']['additional_custom_post_id_multiple'][$this->_tpl_vars['profileBottomNumAdd']]['html']; ?>

          &nbsp;<span class='profile_bottom_add_link_remove'><a href="#" onclick="removeProfileAdd('<?php echo $this->_tpl_vars['profileBottomNum']; ?>
'); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>remove profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>&nbsp;&nbsp;<span class='profile_bottom_add_link'>&nbsp;<a href="#" onclick="addProfileBottomAdd(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
            <br/>
            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change this if you want to use a different profile for additional participants.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
            <br/><span class="profile-links"></span>
      </td>
    </tr>
  <?php endif; ?>
  <?php if ($this->_tpl_vars['addProfileBottom']): ?>
     <tr class="crm-event-manage-registration-form-block-custom_post_<?php echo $this->_tpl_vars['profileBottomNum']; ?>
">
       <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['custom_post_id_multiple'][$this->_tpl_vars['profileBottomNum']]['label']; ?>
</td>
       <td><?php echo $this->_tpl_vars['form']['custom_post_id_multiple'][$this->_tpl_vars['profileBottomNum']]['html']; ?>

           &nbsp;<span class='profile_bottom_link_remove'><a href="#" onclick="removeProfile('<?php echo $this->_tpl_vars['profileBottomNum']; ?>
'); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>remove profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>&nbsp;&nbsp;<span class='profile_bottom_link'><a href="#" onclick="addProfileBottom(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
           <br/>
            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Include additional fields on this registration form by configuring and selecting a CiviCRM Profile to be included at the bottom of the page.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
           <br/><span class="profile-links"></span>
       </td>
     </tr>
  <?php endif; ?>
<?php else: ?>
<?php $this->assign('eventID', $this->_tpl_vars['id']); ?>
<div id="help">
<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>If you want to provide an Online Registration page for this event, check the first box below and then complete the fields on this form.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
<?php echo smarty_function_help(array('id' => "id-event-reg"), $this);?>

</div>
<div class="crm-block crm-form-block crm-event-manage-registration-form-block">
<div class="crm-submit-buttons">
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'top')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</div>

    <div id="register">
     <table class="form-layout">
         <tr class="crm-event-manage-registration-form-block-is_online_registration">
            <td class="label"><?php echo $this->_tpl_vars['form']['is_online_registration']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['is_online_registration']['html']; ?>

            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Enable or disable online registration for this event.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
            </td>
         </tr>
     </table>
    </div>
    <div class="spacer"></div>
    <div id="registration_blocks">
      <table class="form-layout-compressed">

        <tr class="crm-event-manage-registration-form-block-registration_link_text">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['registration_link_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'registration_link_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
            <td><?php echo $this->_tpl_vars['form']['registration_link_text']['html']; ?>
 <?php echo smarty_function_help(array('id' => "id-link_text"), $this);?>
</td>
        </tr>
       <?php if (! $this->_tpl_vars['isTemplate']): ?>
        <tr class="crm-event-manage-registration-form-block-registration_start_date">
           <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['registration_start_date']['label']; ?>
</td>
           <td><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => 'registration_start_date')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
        </tr>
        <tr class="crm-event-manage-registration-form-block-registration_end_date">
           <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['registration_end_date']['label']; ?>
</td>
           <td><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => 'registration_end_date')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
        </tr>
       <?php endif; ?>
        <tr class="crm-event-manage-registration-form-block-is_multiple_registrations">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['is_multiple_registrations']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['is_multiple_registrations']['html']; ?>
 <?php echo smarty_function_help(array('id' => "id-allow_multiple"), $this);?>
</td>
        </tr>
        <tr class="crm-event-manage-registration-form-block-allow_same_participant_emails">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['allow_same_participant_emails']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['allow_same_participant_emails']['html']; ?>
 <?php echo smarty_function_help(array('id' => "id-allow_same_email"), $this);?>
</td>
        </tr>
        <tr class="crm-event-manage-registration-form-block-requires_approval">
          <?php if ($this->_tpl_vars['form']['requires_approval']): ?>
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['requires_approval']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['requires_approval']['html']; ?>
 <?php echo smarty_function_help(array('id' => "id-requires_approval"), $this);?>
</td>
          <?php endif; ?>
        </tr>
        <tr id="id-approval-text" class="crm-event-manage-registration-form-block-approval_req_text">
          <?php if ($this->_tpl_vars['form']['approval_req_text']): ?>
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['approval_req_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'approval_req_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
            <td><?php echo $this->_tpl_vars['form']['approval_req_text']['html']; ?>
</td>
          <?php endif; ?>
        </tr>
        <tr class="crm-event-manage-registration-form-block-expiration_time">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['expiration_time']['label']; ?>
</td>
            <td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['expiration_time']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'four') : smarty_modifier_crmAddClass($_tmp, 'four')); ?>
 <?php echo smarty_function_help(array('id' => "id-expiration_time"), $this);?>
</td>
        </tr>
    </table>
    <div class="spacer"></div>
        <fieldset id="registration" class="crm-collapsible <?php if ($this->_tpl_vars['defaultsEmpty']): ?>collapsed<?php endif; ?>">
      <legend class="collapsible-title"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Registration Screen<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
      <div id="registration_screen">
      <table class= "form-layout-compressed">
       <tr class="crm-event-manage-registration-form-block-intro_text">
          <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['intro_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'intro_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
          <td><?php echo $this->_tpl_vars['form']['intro_text']['html']; ?>

          <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Introductory message / instructions for online event registration page (may include HTML formatting tags).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
          </td>
       </tr>
       <tr class="crm-event-manage-registration-form-block-footer_text">
          <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['footer_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'footer_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
          <td><?php echo $this->_tpl_vars['form']['footer_text']['html']; ?>

          <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Optional footer text for registration screen.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div></td>
       </tr>
   </table>
    <table class= "form-layout-compressed">
         <tr class="crm-event-manage-registration-form-block-custom_pre_id">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['custom_pre_id']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['custom_pre_id']['html']; ?>
<br />
                <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Include additional fields on this registration form by configuring and selecting a CiviCRM Profile to be included at the top of the page (immediately after the introductory message).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo smarty_function_help(array('id' => "event-profile"), $this);?>
</span><br/>
                <span class="profile-links"></span>
            </td>
      </tr>
         <tr id="profile_post" class="crm-event-manage-registration-form-block-custom_post_id">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['custom_post_id']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['custom_post_id']['html']; ?>

          &nbsp;<span class='profile_bottom_link_main <?php if ($this->_tpl_vars['profilePostMultiple']): ?>hiddenElement<?php endif; ?>'>&nbsp;<a href="#" onclick="addProfileBottom(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
          <br />
            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Include additional fields on this registration form by configuring and selecting a CiviCRM Profile to be included at the bottom of the page.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                <br/><span class="profile-links"></span>
            </td>
        </tr>

      <?php if ($this->_tpl_vars['profilePostMultiple']): ?>
         <?php $_from = $this->_tpl_vars['profilePostMultiple']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['profilePostIdName'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['profilePostIdName']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['profilePostNum'] => $this->_tpl_vars['profilePostId']):
        $this->_foreach['profilePostIdName']['iteration']++;
?>
        <tr id="custom_post_id_multiple_<?php echo $this->_tpl_vars['profilePostNum']; ?>
_wrapper" class='crm-event-manage-registration-form-block-custom_post_multiple'>
           <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['custom_post_id_multiple'][$this->_tpl_vars['profilePostNum']]['label']; ?>
</td>
               <td><?php echo $this->_tpl_vars['form']['custom_post_id_multiple'][$this->_tpl_vars['profilePostNum']]['html']; ?>

             &nbsp;<span class='profile_bottom_link_remove'><a href="#" onclick="removeProfile('<?php echo $this->_tpl_vars['profilePostNum']; ?>
'); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>remove profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
             <?php if (($this->_foreach['profilePostIdName']['iteration'] == $this->_foreach['profilePostIdName']['total'])): ?>
               &nbsp;&nbsp;<span class='profile_bottom_link'><a href="#" onclick="addProfileBottom(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
               <?php endif; ?>
                <br/><span class="profile-links"></span>
         </td>
         </tr>
         <?php endforeach; endif; unset($_from); ?>
   <?php endif; ?>
  </table>
  <table class= "form-layout-compressed">
        <tr id="additional_profile_pre" class="crm-event-manage-registration-form-block-additional_custom_pre_id">
            <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['additional_custom_pre_id']['label']; ?>
</td>
            <td><?php echo $this->_tpl_vars['form']['additional_custom_pre_id']['html']; ?>
<br />
              <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change this if you want to use a different profile for additional participants.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               <br/><span class="profile-links"></span>
            </td>
        </tr>
        <tr id="additional_profile_post" class="crm-event-manage-registration-form-block-additional_custom_post_id">
             <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['additional_custom_post_id']['label']; ?>
</td>
             <td><?php echo $this->_tpl_vars['form']['additional_custom_post_id']['html']; ?>

           &nbsp;<span class='profile_bottom_add_link_main <?php if ($this->_tpl_vars['profilePostMultipleAdd']): ?>hiddenElement<?php endif; ?>'><a href="#" onclick="addProfileBottomAdd(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
     <br />
                <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change this if you want to use a different profile for additional participants.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               <br/><span class="profile-links"></span>
             </td>
        </tr>
  <?php if ($this->_tpl_vars['profilePostMultipleAdd']): ?>
         <?php $_from = $this->_tpl_vars['profilePostMultipleAdd']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['profilePostIdAName'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['profilePostIdAName']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['profilePostNumA'] => $this->_tpl_vars['profilePostIdA']):
        $this->_foreach['profilePostIdAName']['iteration']++;
?>
       <tr id='additional_custom_post_id_multiple_<?php echo $this->_tpl_vars['profilePostNumA']; ?>
_wrapper' class='crm-event-manage-registration-form-block-additional_custom_post_multiple'>
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['additional_custom_post_id_multiple'][$this->_tpl_vars['profilePostNumA']]['label']; ?>
</td>
               <td><?php echo $this->_tpl_vars['form']['additional_custom_post_id_multiple'][$this->_tpl_vars['profilePostNumA']]['html']; ?>

                   &nbsp;<span class='profile_bottom_add_link_remove'><a href="#" onclick="removeProfileAdd('<?php echo $this->_tpl_vars['profilePostNumA']; ?>
'); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>remove profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
             <?php if (($this->_foreach['profilePostIdAName']['iteration'] == $this->_foreach['profilePostIdAName']['total'])): ?>
         &nbsp;&nbsp;<span class='profile_bottom_add_link'><a href="#" onclick="addProfileBottomAdd(); return false;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>add profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></span>
               <?php endif; ?>
               <br/><span class="profile-links"></span>
         </td>
         </tr>
         <?php endforeach; endif; unset($_from); ?>
   <?php endif; ?>
        <tr class='crm-event-manage-registration-form-block-create-new-profile'>
            <td class="label"></td>
            <td><a href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/admin/uf/group/add','q' => 'reset=1&action=add'), $this);?>
" target="_blank"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Click here to create a new profile<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a></td>
        </tr>
        </table>
        </div>
  </fieldset>

                <fieldset id="confirm" class="crm-collapsible <?php if ($this->_tpl_vars['defaultsEmpty']): ?>collapsed<?php endif; ?>">
        <legend class="collapsible-title"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Confirmation Screen<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
         <table class= "form-layout-compressed">
           <tr class="crm-event-manage-registration-form-block-confirm_title">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_title']['label']; ?>
 <span class="marker">*</span> <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'confirm_title','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['confirm_title']['html']; ?>
<br />
                  <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Page title for screen where user reviews and confirms their registration information.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
              </td>
           </tr>
           <tr class="crm-event-manage-registration-form-block-confirm_text">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'confirm_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['confirm_text']['html']; ?>

                  <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Optional instructions / message for Confirmation screen.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
              </td>
           </tr>
           <tr class="crm-event-manage-registration-form-block-confirm_footer_text">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_footer_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'confirm_footer_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['confirm_footer_text']['html']; ?>

                 <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Optional page footer text for Confirmation screen.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
              </td>
           </tr>
         </table>
       </fieldset>

                 <fieldset id="thankyou" class="crm-collapsible <?php if ($this->_tpl_vars['defaultsEmpty']): ?>collapsed<?php endif; ?>">
        <legend class="collapsible-title"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Thank-you Screen<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
         <table class= "form-layout-compressed">
           <tr class="crm-event-manage-registration-form-block-confirm_thankyou_title">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['thankyou_title']['label']; ?>
 <span class="marker">*</span> <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'thankyou_title','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['thankyou_title']['html']; ?>

                <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Page title for registration Thank-you screen.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
            </td>
            </tr>
            <tr class="crm-event-manage-registration-form-block-confirm_thankyou_text">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['thankyou_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'thankyou_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['thankyou_text']['html']; ?>

                 <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Optional message for Thank-you screen (may include HTML formatting).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
              </td>
            </tr>
            <tr class="crm-event-manage-registration-form-block-confirm_thankyou_footer_text">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['thankyou_footer_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'thankyou_footer_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
              <td><?php echo $this->_tpl_vars['form']['thankyou_footer_text']['html']; ?>

                  <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Optional footer text for Thank-you screen (often used to include links to other pages/activities on your site).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
              </td>
            </tr>
         </table>
       </fieldset>

                <fieldset id="mail" class="crm-collapsible <?php if ($this->_tpl_vars['defaultsEmpty']): ?>collapsed<?php endif; ?>">
        <legend class="collapsible-title"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Confirmation Email<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
          <div>
          <table class= "form-layout-compressed">
            <tr class="crm-event-manage-registration-form-block-is_email_confirm">
              <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['is_email_confirm']['label']; ?>
</td>
              <td><?php echo $this->_tpl_vars['form']['is_email_confirm']['html']; ?>
<br />
                  <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Do you want a registration confirmation email sent automatically to the user? This email includes event date(s), location and contact information. For paid events, this email is also a receipt for their payment.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
              </td>
            </tr>
          </table>
          <div id="confirmEmail">
           <table class="form-layout-compressed">
             <tr class="crm-event-manage-registration-form-block-confirm_email_text">
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_email_text']['label']; ?>
 <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'confirm_email_text','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
               <td><?php echo $this->_tpl_vars['form']['confirm_email_text']['html']; ?>
<br />
                   <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Additional message or instructions to include in confirmation email.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               </td>
             </tr>
             <tr class="crm-event-manage-registration-form-block-confirm_from_name">
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_from_name']['label']; ?>
 <span class="marker">*</span> <?php if ($this->_tpl_vars['action'] == 2): ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'CRM/Core/I18n/Dialog.tpl', 'smarty_include_vars' => array('table' => 'civicrm_event','field' => 'confirm_from_name','id' => $this->_tpl_vars['eventID'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php endif; ?></td>
               <td><?php echo $this->_tpl_vars['form']['confirm_from_name']['html']; ?>
<br />
                   <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>FROM name for email.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               </td>
             </tr>
             <tr class="crm-event-manage-registration-form-block-confirm_from_email">
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['confirm_from_email']['label']; ?>
 <span class="marker">*</span></td>
               <td><?php echo $this->_tpl_vars['form']['confirm_from_email']['html']; ?>
<br />
                   <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>FROM email address (this must be a valid email account with your SMTP email service provider).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               </td>
             </tr>
             <tr class="crm-event-manage-registration-form-block-cc_confirm">
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['cc_confirm']['label']; ?>
</td>
               <td><?php echo $this->_tpl_vars['form']['cc_confirm']['html']; ?>
<br />
                    <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>You can notify event organizers of each online registration by specifying one or more email addresses to receive a carbon copy (cc). Multiple email addresses should be separated by a comma (e.g. jane@example.org, paula@example.org).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               </td>
             </tr>
              <tr class="crm-event-manage-registration-form-block-bcc_confirm">
               <td scope="row" class="label" width="20%"><?php echo $this->_tpl_vars['form']['bcc_confirm']['label']; ?>
</td>
               <td><?php echo $this->_tpl_vars['form']['bcc_confirm']['html']; ?>
<br />
                  <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>You may specify one or more email addresses to receive a blind carbon copy (bcc) of the confirmation email. Multiple email addresses should be separated by a comma (e.g. jane@example.org, paula@example.org).<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
               </td>
             </tr>
           </table>
        </div>
      </div>
     </fieldset>
    </div>     </div>
 <div class="crm-submit-buttons">
      <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
 </div>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/showHide.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/showHideByFieldValue.tpl", 'smarty_include_vars' => array('trigger_field_id' => 'is_online_registration','trigger_value' => "",'target_element_id' => 'registration_blocks','target_element_type' => 'block','field_type' => 'radio','invert' => 0)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/showHideByFieldValue.tpl", 'smarty_include_vars' => array('trigger_field_id' => 'is_email_confirm','trigger_value' => "",'target_element_id' => 'confirmEmail','target_element_type' => 'block','field_type' => 'radio','invert' => 0)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/showHideByFieldValue.tpl", 'smarty_include_vars' => array('trigger_field_id' => 'is_multiple_registrations','trigger_value' => "",'target_element_id' => "additional_profile_pre|additional_profile_post",'target_element_type' => "table-row",'field_type' => 'radio','invert' => 0)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php if ($this->_tpl_vars['form']['requires_approval']): ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/showHideByFieldValue.tpl", 'smarty_include_vars' => array('trigger_field_id' => 'requires_approval','trigger_value' => "",'target_element_id' => "id-approval-text",'target_element_type' => "table-row",'field_type' => 'radio','invert' => 0)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php endif; ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/buildProfileLink.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<script type="text/javascript">
    <?php echo '
    cj("#is_multiple_registrations").change( function( ) {
        if ( !cj(this).attr( \'checked\') ) {
            cj("#additional_custom_pre_id").val(\'\');
            cj("#additional_custom_post_id").val(\'\');
      cj(".crm-event-manage-registration-form-block-additional_custom_post_multiple").hide();
        } else {
      cj(".crm-event-manage-registration-form-block-additional_custom_post_multiple").show();
  }
    });

    showRuleFields( '; ?>
<?php echo $this->_tpl_vars['ruleFields']; ?>
<?php echo ' );

    function showRuleFields( ruleFields )
    {
        var msg1 = \''; ?>
<?php $this->_tag_stack[] = array('ts', array('1' => "' + ruleFields + '")); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Primary participants will be able to register additional participants using the same email address.  The configured "Supervised" Dedupe Rule will use the following fields to prevent duplicate registrations: %1.  First and Last Name will be used to check for matches among multiple participants.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '\';
        var msg2 = \''; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Primary participants will be allowed to register for this event multiple times.  No duplicate registration checking will be performed.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '\';
        var msg3 = \''; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Primary participants will be able to register additional participants during registration.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '\';

        // Display info
        cj(\'.ui-notify-message .ui-notify-close\').click();
        if ( cj("#allow_same_participant_emails").attr( \'checked\' ) && cj("#is_multiple_registrations").attr( \'checked\' ) ) {
            CRM.alert( msg1, \'\', \'info\', {expires:0} );
        } else if ( cj("#allow_same_participant_emails").attr( \'checked\' ) && !cj("#is_multiple_registrations").attr( \'checked\' ) ) {
            CRM.alert( msg2, \'\', \'info\', {expires:0} );
        } else if ( !cj("#allow_same_participant_emails").attr( \'checked\' ) && cj("#is_multiple_registrations").attr( \'checked\' ) ) {
            CRM.alert( msg3, \'\', \'info\', {expires:0} );
        }
    }

    var profileBottomCount = Number('; ?>
<?php echo count($this->_tpl_vars['profilePostMultiple']); ?>
<?php echo ');

    function addProfileBottom( ) {
      profileBottomCount++;
      cj(\'.profile_bottom_link\').remove( );
      cj(\'.profile_bottom_link_main\').hide( );
      var urlPath = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/event/manage/registration','h' => 0,'q' => $this->_tpl_vars['addProfileParams']), $this);?>
"<?php echo ';
      urlPath = urlPath + \'&snippet=4&addProfileNum=\' + profileBottomCount;
      cj.ajax({ url     : urlPath,
                async   : false,
                global  : false,
          success : function ( content ) {
                 cj( "#profile_post" ).parent().append( content );
                }
      });
    }


    var profileBottomCountAdd = Number('; ?>
<?php echo count($this->_tpl_vars['profilePostMultipleAdd']); ?>
<?php echo ');
    function addProfileBottomAdd( ) {
      profileBottomCountAdd++;
      cj(\'.profile_bottom_add_link\').remove( );
      cj(\'.profile_bottom_add_link_main\').hide( );
      var urlPathAdd = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/event/manage/registration','h' => 0,'q' => $this->_tpl_vars['addProfileParamsAdd']), $this);?>
"<?php echo ';
      urlPathAdd = urlPathAdd + \'&snippet=4&addProfileNumAdd=\' + profileBottomCountAdd;
      cj.ajax({ url     : urlPathAdd,
                async   : false,
                global  : false,
          success : function ( contentAdd ) {
                 cj( "#additional_profile_post" ).parent().append( contentAdd );
                }
      });
    }

    function removeProfile( profileID ) {
      cj(\'#custom_post_id_multiple_\' + profileID).val(\'\');
      cj(\'#custom_post_id_multiple_\' + profileID + \'_wrapper\').remove( );
      if ( cj(\'.profile_bottom_link\').length < 1 ) {
        cj(\'.profile_bottom_link_main\').show( );
      }
    }

    function removeProfileAdd( profileID ) {
      cj(\'#additional_custom_post_id_multiple_\' + profileID).val(\'\');
      cj(\'#additional_custom_post_id_multiple_\' + profileID + \'_wrapper\').remove( );
      if ( cj(\'.profile_bottom_add_link\').length < 1 ) {
        cj(\'.profile_bottom_add_link_main\').show( );
      }
    }

    //show edit profile field links
    cj(function() {
        // show edit for main profile
        cj(\'select[id^="custom_p"]\').live( \'change\',  function( event ) {
            buildLinks( cj(this), cj(this).val());
        });

        // make sure we set edit links for main contact profile when form loads
        cj(\'select[id^="custom_p"]\').each( function(e) {
            buildLinks( cj(this), cj(this).val());
        });

        //show edit profile field links in additional participant
        cj(\'select[id^="additional_custom_p"]\').live( \'change\',  function( event ) {
            buildLinks( cj(this), cj(this).val());
        });

        // make sure we set edit links for additional profile  when form loads
        cj(\'select[id^="additional_custom_p"]\').each( function(e) {
            buildLinks( cj(this), cj(this).val());
        });
    });

    '; ?>

</script>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formNavigate.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php endif; ?>