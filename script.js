document.addEventListener('DOMContentLoaded', () => {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const profileNameInput = document.getElementById('profileName');
    const keyDisplayArea = document.getElementById('keyDisplay');
    const generatedKeyElement = document.getElementById('generatedKey');
    const profileConfirmationElement = document.getElementById('profileConfirmation');

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    generateKeyBtn.addEventListener('click', () => {
        const profileName = profileNameInput.value.trim();

        if (!profileName) {
            alert("Please enter a profile name.");
            return;
        }

        // Simulate profile creation by acknowledging the name.
        // In a real application, this would involve backend interaction.
        if (profileConfirmationElement) {
            profileConfirmationElement.textContent = `Profile for '${profileName}' activated. Your daily key:`;
        }

        const formattedDate = getFormattedDate();
        const randomSuffix = generateRandomString(8);
        const dailyKey = `DAILYKEY-${profileName.toUpperCase().replace(/\s+/g, '_')}-${formattedDate}-${randomSuffix}`;

        if (generatedKeyElement) {
            generatedKeyElement.textContent = dailyKey;
        }
        if (keyDisplayArea) {
            keyDisplayArea.style.display = 'block';
        }
    });
});
