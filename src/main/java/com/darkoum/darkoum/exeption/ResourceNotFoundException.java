package com.darkoum.darkoum.exeption;

// A custom exception class used to indicate that a specific resource could not be found in the system.
public class ResourceNotFoundException extends RuntimeException {
    // Constructor to create an exception with a custom error message.
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
