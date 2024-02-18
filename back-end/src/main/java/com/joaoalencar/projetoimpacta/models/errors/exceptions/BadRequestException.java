package com.joaoalencar.projetoimpacta.models.errors.exceptions;

public class BadRequestException extends RuntimeException {
    
    public BadRequestException(String message) {
		super(message);
	}

	public BadRequestException(String message, Throwable cause) {
		super(message, cause);
	}
}
