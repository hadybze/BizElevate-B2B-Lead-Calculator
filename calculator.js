// B2B Lead Calculator - Main JavaScript File
// BizElevate

class LeadCalculator {
    constructor() {
        this.initElements();
        this.attachEventListeners();
        this.calculate(); // Initial calculation
    }

    initElements() {
        // Input elements
        this.inputs = {
            targetCustomers: document.getElementById('targetCustomers'),
            replyRate: document.getElementById('replyRate'),
            appointmentRate: document.getElementById('appointmentRate'),
            closeRate: document.getElementById('closeRate'),
            workdaysPerMonth: document.getElementById('workdaysPerMonth'),
            emailsPerDomain: document.getElementById('emailsPerDomain'),
            emailsPerLead: document.getElementById('emailsPerLead'),
            emailsPerMailbox: document.getElementById('emailsPerMailbox'),
            mailboxesPerDomain: document.getElementById('mailboxesPerDomain'),
            advancedMode: document.getElementById('advancedMode')
        };

        // Output elements
        this.outputs = {
            emailsPerMonth: document.getElementById('emailsPerMonth'),
            emailsPerDay: document.getElementById('emailsPerDay'),
            leadsRequired: document.getElementById('leadsRequired'),
            domainsRequired: document.getElementById('domainsRequired'),
            repliesNeeded: document.getElementById('repliesNeeded'),
            appointmentsNeeded: document.getElementById('appointmentsNeeded')
        };

        // Other elements
        this.mailboxConstraints = document.getElementById('mailboxConstraints');
        this.warningContainer = document.getElementById('warningContainer');
    }

    attachEventListeners() {
        // Add input event listeners to all input fields
        Object.values(this.inputs).forEach(input => {
            if (input && input.type !== 'checkbox') {
                input.addEventListener('input', () => this.calculate());
            }
        });

        // Advanced mode toggle
        this.inputs.advancedMode.addEventListener('change', (e) => {
            this.toggleAdvancedMode(e.target.checked);
        });
    }

    toggleAdvancedMode(isEnabled) {
        if (isEnabled) {
            this.mailboxConstraints.classList.remove('hidden');
        } else {
            this.mailboxConstraints.classList.add('hidden');
        }
        this.calculate();
    }

    getInputValue(inputElement) {
        const value = parseFloat(inputElement.value);
        return isNaN(value) ? 0 : value;
    }

    calculate() {
        // Get all input values
        const targetCustomers = this.getInputValue(this.inputs.targetCustomers);
        const replyRate = this.getInputValue(this.inputs.replyRate) / 100; // Convert % to decimal
        const appointmentRate = this.getInputValue(this.inputs.appointmentRate) / 100;
        const closeRate = this.getInputValue(this.inputs.closeRate) / 100;
        const workdaysPerMonth = this.getInputValue(this.inputs.workdaysPerMonth);
        const emailsPerDomain = this.getInputValue(this.inputs.emailsPerDomain);
        const emailsPerLead = this.getInputValue(this.inputs.emailsPerLead);
        const isAdvancedMode = this.inputs.advancedMode.checked;
        const emailsPerMailbox = this.getInputValue(this.inputs.emailsPerMailbox);
        const mailboxesPerDomain = this.getInputValue(this.inputs.mailboxesPerDomain);

        // Clear warnings
        this.clearWarnings();

        // Validate inputs
        const validation = this.validateInputs({
            targetCustomers,
            replyRate,
            appointmentRate,
            closeRate,
            workdaysPerMonth,
            emailsPerDomain,
            emailsPerLead,
            isAdvancedMode,
            emailsPerMailbox,
            mailboxesPerDomain
        });

        if (!validation.isValid) {
            this.displayWarnings(validation.warnings);
            this.resetOutputs();
            return;
        }

        // Perform calculations
        const results = this.performCalculations({
            targetCustomers,
            replyRate,
            appointmentRate,
            closeRate,
            workdaysPerMonth,
            emailsPerDomain,
            emailsPerLead,
            isAdvancedMode,
            emailsPerMailbox,
            mailboxesPerDomain
        });

        // Update outputs
        this.updateOutputs(results);

        // Check for warnings after successful calculation
        this.checkPostCalculationWarnings(results, replyRate, appointmentRate, closeRate);
    }

    validateInputs(data) {
        const warnings = [];
        let isValid = true;

        // Check required fields
        if (data.targetCustomers <= 0) {
            warnings.push({
                type: 'error',
                message: 'Enter how many customers you want to close per month. This drives everything else.'
            });
            isValid = false;
        }

        if (data.replyRate === 0 || data.appointmentRate === 0 || data.closeRate === 0) {
            warnings.push({
                type: 'error',
                message: 'Conversion rates can\'t be zero. Use realistic numbers based on your past campaigns.'
            });
            isValid = false;
        }

        if (data.workdaysPerMonth <= 0) {
            warnings.push({
                type: 'error',
                message: 'Enter the number of days you actively send cold emails each month.'
            });
            isValid = false;
        }

        if (data.emailsPerDomain <= 0) {
            warnings.push({
                type: 'error',
                message: 'Enter your daily sending limit per domain to calculate safe scale.'
            });
            isValid = false;
        }

        if (data.emailsPerLead <= 0) {
            warnings.push({
                type: 'error',
                message: 'Enter how many emails your sequence sends per lead.'
            });
            isValid = false;
        }

        // Advanced mode validation
        if (data.isAdvancedMode) {
            if (data.emailsPerMailbox <= 0 || data.mailboxesPerDomain <= 0) {
                warnings.push({
                    type: 'error',
                    message: 'Advanced mode requires both mailbox sending limits and mailboxes per domain.'
                });
                isValid = false;
            }
        }

        return { isValid, warnings };
    }

    performCalculations(data) {
        const {
            targetCustomers,
            replyRate,
            appointmentRate,
            closeRate,
            workdaysPerMonth,
            emailsPerDomain,
            emailsPerLead,
            isAdvancedMode,
            emailsPerMailbox,
            mailboxesPerDomain
        } = data;

        // Core calculation: Required Emails per Month
        const conversionRate = replyRate * appointmentRate * closeRate;
        const requiredEmailsMonth = targetCustomers / conversionRate;

        // Required Emails per Day
        const requiredEmailsDay = requiredEmailsMonth / workdaysPerMonth;

        // Leads Required per Month
        const leadsMonth = requiredEmailsMonth / emailsPerLead;

        // Domains Required
        let domainsRequired;
        if (isAdvancedMode && emailsPerMailbox > 0 && mailboxesPerDomain > 0) {
            const emailsPerDomainDayMax = emailsPerMailbox * mailboxesPerDomain;
            domainsRequired = Math.ceil(requiredEmailsDay / emailsPerDomainDayMax);
        } else {
            domainsRequired = Math.ceil(requiredEmailsDay / emailsPerDomain);
        }

        // Funnel Reality Numbers
        const appointmentsNeeded = targetCustomers / closeRate;
        const repliesNeeded = appointmentsNeeded / appointmentRate;

        return {
            requiredEmailsMonth: Math.ceil(requiredEmailsMonth),
            requiredEmailsDay: Math.ceil(requiredEmailsDay),
            leadsMonth: Math.ceil(leadsMonth),
            domainsRequired,
            appointmentsNeeded: Math.ceil(appointmentsNeeded),
            repliesNeeded: Math.ceil(repliesNeeded)
        };
    }

    updateOutputs(results) {
        this.outputs.emailsPerMonth.textContent = this.formatNumber(results.requiredEmailsMonth);
        this.outputs.emailsPerDay.textContent = this.formatNumber(results.requiredEmailsDay);
        this.outputs.leadsRequired.textContent = this.formatNumber(results.leadsMonth);
        this.outputs.domainsRequired.textContent = this.formatNumber(results.domainsRequired);
        this.outputs.repliesNeeded.textContent = this.formatNumber(results.repliesNeeded);
        this.outputs.appointmentsNeeded.textContent = this.formatNumber(results.appointmentsNeeded);
    }

    resetOutputs() {
        Object.values(this.outputs).forEach(output => {
            output.textContent = '—';
        });
    }

    checkPostCalculationWarnings(results, replyRate, appointmentRate, closeRate) {
        const warnings = [];

        // Check if any rate is below 1%
        if (replyRate < 0.01 || appointmentRate < 0.01 || closeRate < 0.01) {
            warnings.push({
                type: 'warning',
                message: 'Warning: One or more rates are below 1%. Volume required will be high.'
            });
        }

        // Check if domains > 20
        if (results.domainsRequired > 20) {
            warnings.push({
                type: 'info',
                message: 'You\'re operating at scale. You\'ll need ' + results.domainsRequired + ' domains.'
            });
        }

        // Check for extreme volumes
        if (results.requiredEmailsDay > 1000) {
            warnings.push({
                type: 'warning',
                message: 'This requires ' + this.formatNumber(results.requiredEmailsDay) + ' emails per day. Ensure your infrastructure can support this volume.'
            });
        }

        if (warnings.length > 0) {
            this.displayWarnings(warnings);
        }
    }

    displayWarnings(warnings) {
        this.warningContainer.innerHTML = '';
        this.warningContainer.classList.remove('hidden');

        warnings.forEach(warning => {
            const warningBox = document.createElement('div');
            warningBox.className = `warning-box ${warning.type}`;

            const icon = this.getWarningIcon(warning.type);
            warningBox.innerHTML = `<span>${icon}</span><span>${warning.message}</span>`;

            this.warningContainer.appendChild(warningBox);
        });
    }

    clearWarnings() {
        this.warningContainer.innerHTML = '';
        this.warningContainer.classList.add('hidden');
    }

    getWarningIcon(type) {
        const icons = {
            error: '⚠️',
            warning: '⚡',
            info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) {
            return '—';
        }
        return new Intl.NumberFormat('en-US').format(num);
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LeadCalculator();
});
