import removeStartingHttpDoubleSlash from "../removeStartingDoubleSlash";
test.each([{original: "http://www.google.com", converted: "www.google.com"},
    {original: "https://www.amazon.in", converted: "https://www.amazon.in"},
    {original: "This is a correct string", converted: "This is a correct string"}
])(
    'Should remove the unsecured http:// from the url if it contains it otherwise returns the string as it is',
    ({original, converted}) => {
        expect(removeStartingHttpDoubleSlash(original)).toEqual(converted);
    }
)