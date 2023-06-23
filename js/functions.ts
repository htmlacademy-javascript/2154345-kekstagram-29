interface Time {
	[hours: number]: number
}

const enum Default {
	MAX_STRING_LENGTH = 140
}

const isShorterThan = ({length}: string, maxLength: number = Default.MAX_STRING_LENGTH): boolean => (length <= maxLength);

const isPalindrome = (str: string): boolean => {
	const clearedString = str.toLowerCase().replaceAll(' ', '');

	return clearedString === clearedString.split('').reverse().join('');
};

const getNumbersFromString = (input: number | string) => {
	const stringWithOnlyDigits = String(input).replace(/\D/g, '');
	return parseInt(stringWithOnlyDigits, 10);
};

const isNumberInTimeRange = (time: number[], bottom = [0, 0], top = [24, 0]) => (bottom <= time && time <= top);

const parseTimeToNumbers = (time: string) => {
	const result: number[] = [];

	time.split(':').forEach((timePiece) => {
		result.push(Number(timePiece));
	});

	return result;
};

const addingMinutes = (time: number[], duration: number) => [time[0] + Math.floor(duration / 60), time[1] + duration % 60];

const isTimeSpanOutOfBounds = (workStartTime: string, workEndTime: string, meetingStartTime: string, meetingDurationTime: number) => {
	const parsedWorkStartTime = parseTimeToNumbers(workStartTime);
	const parsedWorkEndTime = parseTimeToNumbers(workEndTime);
	const parsedMeetingStartTime = parseTimeToNumbers(meetingStartTime);
};

export { isShorterThan, isPalindrome, getNumbersFromString };
