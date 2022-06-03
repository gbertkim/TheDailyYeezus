import React from 'react'

interface ErrorBoundaryProps {
    onError?: (error:Error) => void;
}
interface ErrorBoundaryState {
    message: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props:any) {
        super(props);
        this.state = {
            message: ''
        }
    }
    static getDerivedStateFromError(error:any) {
        return { message: error.message }
    }
    render() {
        if (this.state.message) {
            return <h1 style={{zIndex: '1000', height: '100vh', width: '100%', backgroundColor: 'white', color: 'black' }}>{this.state.message}</h1>
        }
        return this.props.children
    }
}
