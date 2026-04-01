import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Utility function for getting a new numeric id value 1 higher than the previous highest id value in a given list.
 * @param list array of objects containing an id number
 * @returns new id number
 */
export function generateIdFromList(list: { id: number }[]) {
	let id = 0
	list.forEach(entry => {
		if (id <= entry.id) {
			id = entry.id + 1
		}
	})
	return id
}

/**
 * Displays a number as a USD value.
 * 
 * @param value number to display in dollars
 * @returns number formatted as USD.
 */
export function toUSD(value: number) {
	return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger'}).format(value)
}