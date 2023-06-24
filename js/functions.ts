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

const parseTimeToNumbers = (time: string) => time.split(':').map(Number);

const isArrayLargerThan = (firstArr: number[], secondArr: number[]) => {
	const differenceOfHours = firstArr[0] - secondArr[0];

	if (differenceOfHours) {
		return differenceOfHours > 0;
	}

	return firstArr[1] >= secondArr[1];
};

const isNumberInTimeRange = (bottom = [0, 0], time: number[], top = [24, 0]) => (isArrayLargerThan(time, bottom) && isArrayLargerThan(top, time));

const addingMinutes = (time: number[], duration: number) => [time[0] + Math.floor(duration / 60), time[1] + duration % 60];

const isTimeSpanOutOfBounds = (workStartTime: string, workEndTime: string, meetingStartTime: string, meetingDurationTime: number) => {
	const parsedWorkStartTime = parseTimeToNumbers(workStartTime);
	const parsedWorkEndTime = parseTimeToNumbers(workEndTime);
	const parsedMeetingStartTime = parseTimeToNumbers(meetingStartTime);
	const parsedMeetingEndTime = addingMinutes(parsedMeetingStartTime, meetingDurationTime);

	const startMeeting = isNumberInTimeRange(parsedWorkStartTime, parsedMeetingStartTime, parsedMeetingEndTime);
	const endMeeting = isNumberInTimeRange(parsedMeetingStartTime, parsedMeetingEndTime, parsedWorkEndTime);

	return (startMeeting && endMeeting);
};

export { isShorterThan, isPalindrome, getNumbersFromString, isTimeSpanOutOfBounds };
