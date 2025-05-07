document.addEventListener('DOMContentLoaded', () => {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const profileNameInput = document.getElementById('profileName');
    const profileEmailInput = document.getElementById('profileEmail');
    const keyDisplayArea = document.getElementById('keyDisplay');
    const generatedKeyElement = document.getElementById('generatedKey');
    const profileConfirmationElement = document.getElementById('profileConfirmation');
    const avatarPreviewElement = document.getElementById('avatarPreview');
    const instructionsArea = document.getElementById('instructions');
    const keyNoteElement = document.getElementById('keyNote');
    const profileNameGroup = document.getElementById('profileNameGroup');
    const keyTypeRadios = document.querySelectorAll('input[name="keyType"]');

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
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

    const generateInitials = (name, email) => {
        if (name && name.trim()) {
            const parts = name.trim().split(/\s+/);
            if (parts.length > 1) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return parts[0].substring(0, 2).toUpperCase();
        }
        if (email && email.trim()) {
            return email.substring(0, 2).toUpperCase();
        }
        return 'LP';
    };

    const updateAvatarPreview = () => {
        const profileName = profileNameInput.value;
        const profileEmail = profileEmailInput.value;
        if (avatarPreviewElement) {
            avatarPreviewElement.textContent = generateInitials(profileName, profileEmail);
        }
    };

    profileNameInput.addEventListener('input', updateAvatarPreview);
    profileEmailInput.addEventListener('input', updateAvatarPreview);

    keyTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'daily_general') {
                profileNameGroup.style.display = 'block';
            } else {
                profileNameGroup.style.display = 'none';
            }
            // Clear previous key display when type changes
            keyDisplayArea.style.display = 'none';
            instructionsArea.style.display = 'none';
        });
    });
     // Initial check for profile name visibility
    if (document.querySelector('input[name="keyType"]:checked').value === 'daily_general') {
        profileNameGroup.style.display = 'block';
    } else {
        profileNameGroup.style.display = 'none';
    }


    generateKeyBtn.addEventListener('click', () => {
        const selectedKeyType = document.querySelector('input[name="keyType"]:checked').value;
        const profileName = profileNameInput.value.trim();
        const profileEmail = profileEmailInput.value.trim();
        let dailyKey = '';
        let keyMessage = '';
        let confirmationMessage = `Login Key:`;

        if (selectedKeyType === 'daily_general') {
            if (!profileName) {
                alert("Please enter a profile name for the daily general key.");
                return;
            }
            confirmationMessage = `Daily General Key for profile '${profileName}':`;
            const formattedDate = getFormattedDate();
            const randomSuffix = generateRandomString(8);
            const profileKeyPart = profileName
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '_')
                .substring(0, 15);
            dailyKey = `DAILYKEY-${profileKeyPart}-${formattedDate}-${randomSuffix}`;
            keyMessage = `This key is valid for today (${formattedDate}) only and provides general access. Copy and use this key to log in to the LEWIS application.`;
        } else if (selectedKeyType === 'normal_demo') {
            dailyKey = 'DEMO-KEY-NORMAL';
            confirmationMessage = 'Normal User Demo Key:';
            keyMessage = 'Use this key to log into LEWIS in "Normal User" mode for demonstration purposes. This is a static demo key.';
        } else if (selectedKeyType === 'enterprise_demo') {
            dailyKey = 'DEMO-KEY-ENTERPRISE';
            confirmationMessage = 'Enterprise User (Admin) Demo Key:';
            keyMessage = 'Use this key to log into LEWIS in "Enterprise Mode" for demonstration purposes (simulates admin access). This is a static demo key.';
        }

        if (profileConfirmationElement) {
            profileConfirmationElement.textContent = confirmationMessage;
        }
        if (keyNoteElement) {
            keyNoteElement.textContent = keyMessage;
        }

        if (generatedKeyElement) {
            generatedKeyElement.textContent = dailyKey;
            generatedKeyElement.onclick = () => {
                navigator.clipboard.writeText(dailyKey).then(() => {
                    alert('Key copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy key: ', err);
                    alert('Failed to copy key. Please copy manually.');
                });
            };
        }
        if (keyDisplayArea) {
            keyDisplayArea.style.display = 'block';
        }
        if (instructionsArea) {
            instructionsArea.style.display = 'block';
        }

        updateAvatarPreview();
    });

    updateAvatarPreview(); // Initialize avatar on load
});
