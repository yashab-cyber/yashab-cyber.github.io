document.addEventListener('DOMContentLoaded', () => {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const profileNameInput = document.getElementById('profileName');
    const profileEmailInput = document.getElementById('profileEmail'); // Added email input
    const keyDisplayArea = document.getElementById('keyDisplay');
    const generatedKeyElement = document.getElementById('generatedKey');
    const profileConfirmationElement = document.getElementById('profileConfirmation');
    const avatarPreviewElement = document.getElementById('avatarPreview'); // Avatar preview element
    const instructionsArea = document.getElementById('instructions');


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

    // Function to generate initials for avatar preview
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
        return 'LP'; // Default LEWIS Profile
    };

    // Update avatar preview on input change
    const updateAvatarPreview = () => {
        const profileName = profileNameInput.value;
        const profileEmail = profileEmailInput.value;
        if (avatarPreviewElement) {
            avatarPreviewElement.textContent = generateInitials(profileName, profileEmail);
        }
    };

    profileNameInput.addEventListener('input', updateAvatarPreview);
    profileEmailInput.addEventListener('input', updateAvatarPreview);


    generateKeyBtn.addEventListener('click', () => {
        const profileName = profileNameInput.value.trim();

        if (!profileName) {
            alert("Please enter a profile name for the key identifier.");
            return;
        }

        if (profileConfirmationElement) {
            profileConfirmationElement.textContent = `Login Key for profile '${profileName}':`;
        }

        const formattedDate = getFormattedDate();
        const randomSuffix = generateRandomString(8);
        // Sanitize profile name for key: replace non-alphanumeric with underscore, convert to uppercase, limit length
        const profileKeyPart = profileName
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '_')
            .substring(0, 15);

        const dailyKey = `LEWISKEY-${profileKeyPart}-${formattedDate}-${randomSuffix}`;

        if (generatedKeyElement) {
            generatedKeyElement.textContent = dailyKey;
            generatedKeyElement.onclick = () => { // Allow copying key on click
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
            instructionsArea.style.display = 'block'; // Show instructions
        }

        updateAvatarPreview(); // Ensure avatar reflects final name
    });

    // Initialize avatar on load if there's any input already (e.g., browser autofill)
    updateAvatarPreview();
});
