export const natsWrapper = {
    client: {
        // eslint-disable-next-line no-undef
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: () => void) => {
                callback();
            },
        ),
    },
};
