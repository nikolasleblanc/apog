<?php /* Smarty version 2.6.27, created on 2013-08-06 21:48:10
         compiled from CRM/Admin/Form/PaymentProcessor.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/Admin/Form/PaymentProcessor.tpl', 27, false),array('function', 'help', 'CRM/Admin/Form/PaymentProcessor.tpl', 39, false),array('function', 'crmURL', 'CRM/Admin/Form/PaymentProcessor.tpl', 54, false),array('modifier', 'cat', 'CRM/Admin/Form/PaymentProcessor.tpl', 70, false),array('modifier', 'crmAddClass', 'CRM/Admin/Form/PaymentProcessor.tpl', 88, false),)), $this); ?>
<h3><?php if ($this->_tpl_vars['action'] == 1): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>New Payment Processor<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php elseif ($this->_tpl_vars['action'] == 2): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Edit Payment Processor<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php else: ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Delete Payment Processor<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php endif; ?></h3>
<div class="crm-block crm-form-block crm-paymentProcessor-form-block">
 <div class="crm-submit-buttons"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'top')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>

<?php if ($this->_tpl_vars['action'] == 8): ?>
  <div class="messages status no-popup">  
      <div class="icon inform-icon"></div> 
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>WARNING: Deleting this Payment Processor may result in some transaction pages being rendered inactive.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Do you want to continue?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
  </div>
<?php else: ?>
  <table class="form-layout-compressed">
    <tr class="crm-paymentProcessor-form-block-payment_processor_type">
        <td class="label"><?php echo $this->_tpl_vars['form']['payment_processor_type_id']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['payment_processor_type_id']['html']; ?>
 <?php echo smarty_function_help(array('id' => 'proc-type'), $this);?>
</td>
    </tr>
    <tr class="crm-paymentProcessor-form-block-name">
        <td class="label"><?php echo $this->_tpl_vars['form']['name']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['name']['html']; ?>
</td>
    </tr>
    <tr class="crm-paymentProcessor-form-block-description">
        <td class="label"><?php echo $this->_tpl_vars['form']['description']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['description']['html']; ?>
</td>
    </tr>
    
    <tr class="crm-paymentProcessor-form-block-financial_account">
      <td class="label"><?php echo $this->_tpl_vars['form']['financial_account_id']['label']; ?>
</td>
      <td>
	<?php if ($this->_tpl_vars['financialAccount']): ?>
	  <?php echo $this->_tpl_vars['form']['financial_account_id']['html']; ?>

    	<?php else: ?>
  	  <?php ob_start(); ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/admin/financial/financialAccount','q' => "reset=1"), $this);?>
<?php $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('ftUrl', ob_get_contents());ob_end_clean(); ?>
	  <?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['ftUrl'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>There are no financial accounts configured with Financial Account Type 'Asset' Type. <a href='%1'>Click here</a> if you want to configure financial accounts for your site.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
        <?php endif; ?>
      </td>
    </tr>
    <tr class="crm-paymentProcessor-form-block-is_active">
        <td></td><td><?php echo $this->_tpl_vars['form']['is_active']['html']; ?>
&nbsp;<?php echo $this->_tpl_vars['form']['is_active']['label']; ?>
</td>
    </tr>
    <tr class="crm-paymentProcessor-form-block-is_default">
        <td></td><td><?php echo $this->_tpl_vars['form']['is_default']['html']; ?>
&nbsp;<?php echo $this->_tpl_vars['form']['is_default']['label']; ?>
</td>
    </tr>
  </table>
<fieldset>
<legend><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Processor Details for Live Payments<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
    <table class="form-layout-compressed">
        <tr class="crm-paymentProcessor-form-block-user_name">
            <td class="label"><?php echo $this->_tpl_vars['form']['user_name']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['user_name']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-user-name') : smarty_modifier_cat($_tmp, '-live-user-name')),'title' => $this->_tpl_vars['form']['user_name']['label']), $this);?>
</td>
        </tr>
<?php if ($this->_tpl_vars['form']['password']): ?>
        <tr class="crm-paymentProcessor-form-block-password">
            <td class="label"><?php echo $this->_tpl_vars['form']['password']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['password']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-password') : smarty_modifier_cat($_tmp, '-live-password')),'title' => $this->_tpl_vars['form']['password']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['signature']): ?>
        <tr class="crm-paymentProcessor-form-block-signature">
            <td class="label"><?php echo $this->_tpl_vars['form']['signature']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['signature']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-signature') : smarty_modifier_cat($_tmp, '-live-signature')),'title' => $this->_tpl_vars['form']['signature']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['subject']): ?>
        <tr class="crm-paymentProcessor-form-block-subject">
            <td class="label"><?php echo $this->_tpl_vars['form']['subject']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['subject']['html']; ?>
</td>
        </tr>
<?php endif; ?>
        <tr class="crm-paymentProcessor-form-block-url_site">
            <td class="label"><?php echo $this->_tpl_vars['form']['url_site']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['url_site']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-url-site') : smarty_modifier_cat($_tmp, '-live-url-site')),'title' => $this->_tpl_vars['form']['url_site']['label']), $this);?>
</td>
        </tr>
<?php if ($this->_tpl_vars['form']['url_api']): ?>
        <tr class="crm-paymentProcessor-form-block-url_api">
            <td class="label"><?php echo $this->_tpl_vars['form']['url_api']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['url_api']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-url-api') : smarty_modifier_cat($_tmp, '-live-url-api')),'title' => $this->_tpl_vars['form']['url_api']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['is_recur']): ?>
        <tr class="crm-paymentProcessor-form-block-url_recur">
            <td class="label"><?php echo $this->_tpl_vars['form']['url_recur']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['url_recur']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-url-recur') : smarty_modifier_cat($_tmp, '-live-url-recur')),'title' => $this->_tpl_vars['form']['url_recur']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['url_button']): ?>
        <tr class="crm-paymentProcessor-form-block-url_button">
            <td class="label"><?php echo $this->_tpl_vars['form']['url_button']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['url_button']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-live-url-button') : smarty_modifier_cat($_tmp, '-live-url-button')),'title' => $this->_tpl_vars['form']['url_button']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
    </table>        
</fieldset>

<fieldset>
<legend><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Processor Details for Test Payments<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
    <table class="form-layout-compressed">                      
        <tr class="crm-paymentProcessor-form-block-test_user_name">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_user_name']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['test_user_name']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-user-name') : smarty_modifier_cat($_tmp, '-test-user-name')),'title' => $this->_tpl_vars['form']['test_user_name']['label']), $this);?>
</td></tr>
<?php if ($this->_tpl_vars['form']['test_password']): ?>
        <tr class="crm-paymentProcessor-form-block-test_password">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_password']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['test_password']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-password') : smarty_modifier_cat($_tmp, '-test-password')),'title' => $this->_tpl_vars['form']['test_password']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['test_signature']): ?>
        <tr class="crm-paymentProcessor-form-block-test_signature">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_signature']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['test_signature']['html']; ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-signature') : smarty_modifier_cat($_tmp, '-test-signature')),'title' => $this->_tpl_vars['form']['test_signature']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['test_subject']): ?>
        <tr class="crm-paymentProcessor-form-block-test_subject">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_subject']['label']; ?>
</td><td><?php echo $this->_tpl_vars['form']['test_subject']['html']; ?>
</td>
        </tr>
<?php endif; ?>
        <tr class="crm-paymentProcessor-form-block-test_url_site">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_url_site']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['test_url_site']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-url-site') : smarty_modifier_cat($_tmp, '-test-url-site')),'title' => $this->_tpl_vars['form']['test_url_site']['label']), $this);?>
</td>
        </tr>
<?php if ($this->_tpl_vars['form']['test_url_api']): ?>
        <tr class="crm-paymentProcessor-form-block-test_url_api">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_url_api']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['test_url_api']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-url-api') : smarty_modifier_cat($_tmp, '-test-url-api')),'title' => $this->_tpl_vars['form']['test_url_api']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['is_recur']): ?>
        <tr class="crm-paymentProcessor-form-block-test_url_recur">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_url_recur']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['test_url_recur']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-url-recur') : smarty_modifier_cat($_tmp, '-test-url-recur')),'title' => $this->_tpl_vars['form']['test_url_recur']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>
<?php if ($this->_tpl_vars['form']['test_url_button']): ?>
        <tr class="crm-paymentProcessor-form-block-test_url_button">
            <td class="label"><?php echo $this->_tpl_vars['form']['test_url_button']['label']; ?>
</td><td><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['test_url_button']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
 <?php echo smarty_function_help(array('id' => ((is_array($_tmp=$this->_tpl_vars['ppTypeName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '-test-url-button') : smarty_modifier_cat($_tmp, '-test-url-button')),'title' => $this->_tpl_vars['form']['test_url_button']['label']), $this);?>
</td>
        </tr>
<?php endif; ?>  
<?php endif; ?> 
</table>
       <div class="crm-submit-buttons"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
  </fieldset>
</div>

<?php if ($this->_tpl_vars['action'] == 1 || $this->_tpl_vars['action'] == 2): ?>
<script type="text/javascript" >
<?php echo '
    function reload(refresh) {
        var paymentProcessorType = document.getElementById("payment_processor_type_id");
        var url = '; ?>
"<?php echo $this->_tpl_vars['refreshURL']; ?>
"<?php echo '
        var post = url + "&pp=" + paymentProcessorType.value;
        if( refresh ) {
            window.location= post; 
        }
    }
'; ?>

    </script>

<?php endif; ?>