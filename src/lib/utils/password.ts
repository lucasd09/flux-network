/**
 * Hash a password using PBKDF2 with a random salt
 * @param password The plain text password to hash
 * @returns A base64 encoded string containing the salt and derived key
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  // Encode password
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  
  // Hash the password with PBKDF2
  const importedKey = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt.buffer, // Convert Uint8Array to ArrayBuffer
      iterations: 100000, // High iteration count for security
      hash: 'SHA-256'
    },
    importedKey,
    256 // 256 bits output
  );
  
  // Combine salt and hash
  const hashArray = new Uint8Array(salt.length + new Uint8Array(derivedBits).length);
  hashArray.set(salt, 0);
  hashArray.set(new Uint8Array(derivedBits), salt.length);
  
  // Convert to base64 for storage
  return btoa(String.fromCharCode(...hashArray));
}

/**
 * Verify a password against a stored hash
 * @param storedHash The stored hash (containing salt and derived key)
 * @param password The plain text password to verify
 * @returns Boolean indicating if the password matches
 */
export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  try {
    // Decode the stored hash to get salt and hash
    const hashBuffer = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));
    
    // Extract salt (first 16 bytes)
    const salt = hashBuffer.slice(0, 16);
    const storedHashPart = hashBuffer.slice(16);
    
    // Encode password
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    
    // Import the password as a key
    const importedKey = await crypto.subtle.importKey(
      'raw',
      passwordData,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    // Derive bits using the same parameters
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt.buffer, // Convert Uint8Array to ArrayBuffer
        iterations: 100000,
        hash: 'SHA-256'
      },
      importedKey,
      256
    );
    
    // Compare the derived hash with the stored hash
    const newHashPart = new Uint8Array(derivedBits);
    
    if (storedHashPart.length !== newHashPart.length) return false;
    
    // Compare each byte
    for (let i = 0; i < storedHashPart.length; i++) {
      if (storedHashPart[i] !== newHashPart[i]) return false;
    }
    
    return true;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}