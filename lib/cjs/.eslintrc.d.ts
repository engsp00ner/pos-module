export declare const parser: string;
declare const _extends: string[];
export { _extends as extends };
export declare namespace parserOptions {
    const project: string;
    const ecmaVersion: number;
    const sourceType: string;
    namespace ecmaFeatures {
        const jsx: boolean;
    }
}
export declare const plugins: string[];
export declare const rules: {
    "prettier/prettier": string;
    'jsx-a11y/no-static-element-interactions': string;
    'jsx-a11y/click-events-have-key-events': string;
    "linebreak-style": string[];
    "import/prefer-default-export": string;
    "react/require-default-props": string;
    "react/prop-types": string;
    "react/react-in-jsx-scope": string;
    "react/no-array-index-key": string;
    'jsx-a11y/control-has-associated-label': string;
    'jsx-a11y/anchor-is-valid': string;
    "no-console": string;
    "jsx-a11y/no-noninteractive-element-to-interactive-role": string;
    "no-param-reassign": (string | {
        props: boolean;
        ignorePropertyModificationsFor: string[];
    })[];
    "no-use-before-define": string;
    "@typescript-eslint/no-use-before-define": (string | {
        functions: boolean;
        classes: boolean;
        variables: boolean;
    })[];
};
export declare namespace settings {
    namespace react {
        const version: string;
    }
}
export declare const overrides: {
    files: string[];
    parser: string;
    parserOptions: {
        ecmaVersion: number;
        sourceType: string;
    };
}[];
