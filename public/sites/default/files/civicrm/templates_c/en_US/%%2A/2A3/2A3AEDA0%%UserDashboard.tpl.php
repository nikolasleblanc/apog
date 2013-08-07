<?php /* Smarty version 2.6.27, created on 2013-08-07 13:29:43
         compiled from CRM/Event/Page/UserDashboard.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/Event/Page/UserDashboard.tpl', 30, false),array('function', 'counter', 'CRM/Event/Page/UserDashboard.tpl', 39, false),array('function', 'cycle', 'CRM/Event/Page/UserDashboard.tpl', 41, false),array('function', 'crmURL', 'CRM/Event/Page/UserDashboard.tpl', 42, false),array('modifier', 'crmDate', 'CRM/Event/Page/UserDashboard.tpl', 44, false),array('modifier', 'date_format', 'CRM/Event/Page/UserDashboard.tpl', 48, false),)), $this); ?>
<div class="view-content">
    <?php if ($this->_tpl_vars['event_rows']): ?>
        <?php echo '<div class="description">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Click on the event name for more information.'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</div><table class="selector"><tr class="columnheader"><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Event'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Event Date(s)'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Status'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th></th></tr>'; ?><?php echo smarty_function_counter(array('start' => 0,'skip' => 1,'print' => false), $this);?><?php echo ''; ?><?php $_from = $this->_tpl_vars['event_rows']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['row']):
?><?php echo '<tr id=\'rowid'; ?><?php echo $this->_tpl_vars['row']['participant_id']; ?><?php echo '\' class=" crm-event-participant-id_'; ?><?php echo $this->_tpl_vars['row']['participant_id']; ?><?php echo ' '; ?><?php echo smarty_function_cycle(array('values' => "odd-row,even-row"), $this);?><?php echo ''; ?><?php if ($this->_tpl_vars['row']['status'] == Cancelled): ?><?php echo ' disabled'; ?><?php endif; ?><?php echo '"><td class="crm-participant-event-id_'; ?><?php echo $this->_tpl_vars['row']['event_id']; ?><?php echo '"><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/event/info','q' => "reset=1&id=".($this->_tpl_vars['row']['event_id'])."&context=dashboard"), $this);?><?php echo '">'; ?><?php echo $this->_tpl_vars['row']['event_title']; ?><?php echo '</a></td><td class="crm-participant-event_start_date">'; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row']['event_start_date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?><?php echo ''; ?><?php if ($this->_tpl_vars['row']['event_end_date']): ?><?php echo '&nbsp; - &nbsp;'; ?><?php echo ''; ?><?php if (((is_array($_tmp=$this->_tpl_vars['row']['event_end_date'])) ? $this->_run_mod_handler('date_format', true, $_tmp, "%Y%m%d") : smarty_modifier_date_format($_tmp, "%Y%m%d")) == ((is_array($_tmp=$this->_tpl_vars['row']['event_start_date'])) ? $this->_run_mod_handler('date_format', true, $_tmp, "%Y%m%d") : smarty_modifier_date_format($_tmp, "%Y%m%d"))): ?><?php echo ''; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row']['event_end_date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp, 0, 1) : smarty_modifier_crmDate($_tmp, 0, 1)); ?><?php echo ''; ?><?php else: ?><?php echo ''; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row']['event_end_date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?><?php echo ''; ?><?php endif; ?><?php echo ''; ?><?php endif; ?><?php echo '</td><td class="crm-participant-participant_status">'; ?><?php echo $this->_tpl_vars['row']['participant_status']; ?><?php echo '</td><td class="crm-participant-showConfirmUrl">'; ?><?php if ($this->_tpl_vars['row']['showConfirmUrl']): ?><?php echo '<a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/event/confirm','q' => "reset=1&participantId=".($this->_tpl_vars['row']['participant_id'])), $this);?><?php echo '">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Confirm Registration'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</a>'; ?><?php endif; ?><?php echo '</td></tr>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '</table>'; ?>

    <?php else: ?>
        <div class="messages status no-popup">
           <div class="icon inform-icon"></div>&nbsp;
                 <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>You are not registered for any current or upcoming Events.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
               
        </div>
    <?php endif; ?>
</div>