import React, {Component, MouseEvent} from 'react';

import './Floater.scoped.css';

enum FloaterSnapPosition {
    TOP_LEFT,
    MID_LEFT,
    BOTTOM_LEFT,
    TOP_RIGHT,
    MID_RIGHT,
    BOTTOM_RIGHT,
}

type WindowPosition = {
    x: number;
    y: number;
}

type FloaterState = {
    dragging: boolean,
    position: WindowPosition,
    relative: WindowPosition,
    snapPositions: WindowPosition[],
    snappedPosition: FloaterSnapPosition,
    showContent: boolean,
}


class Floater extends Component<any, FloaterState> {

    private floaterRef = React.createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);
        this.state = {
            dragging: false,
            position: {
                x: 0,
                y: 0,
            },
            relative: {
                x: 0,
                y: 0,
            },
            snapPositions: [
                {
                    x: 80,
                    y: 80,
                },
                {
                    x: 80,
                    y: window.innerHeight * .5,
                },
                {
                    x: 80,
                    y: window.innerHeight - 100,
                },
                {
                    x: window.innerWidth - 100,
                    y: 80,
                },
                {
                    x: window.innerWidth - 100,
                    y: window.innerHeight * .5,
                },
                {
                    x: window.innerWidth - 100,
                    y: window.innerHeight - 100,
                }
            ],
            snappedPosition: FloaterSnapPosition.BOTTOM_RIGHT,
            showContent: false,
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<FloaterState>, snapshot?: any) {
        if (this.state.dragging && !prevState.dragging) {
            // @ts-ignore
            document.addEventListener('mousemove', this.onMouseMove.bind(this))
            // @ts-ignore
            document.addEventListener('mouseup', this.onMouseUp.bind(this))
        } else if (!this.state.dragging && prevState.dragging) {
            // @ts-ignore
            document.removeEventListener('mousemove', this.onMouseMove.bind(this))
            // @ts-ignore
            document.removeEventListener('mouseup', this.onMouseUp.bind(this))
        }
    }

    componentDidMount() {
        this.updateWindowsDimensions();
        window.addEventListener('resize', this.updateWindowsDimensions.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowsDimensions.bind(this))
    }

    updateWindowsDimensions() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.setState({
            snapPositions: [
                {
                    x: 80,
                    y: 80,
                },
                {
                    x: 80,
                    y: height * .5,
                },
                {
                    x: 80,
                    y: height - 100,
                },
                {
                    x: width - 100,
                    y: 80,
                },
                {
                    x: width - 100,
                    y: height * .5,
                },
                {
                    x: width - 100,
                    y: height - 100,
                }
            ],
        });
        this.setState({
            position: {
                x: this.state.snapPositions[this.state.snappedPosition].x,
                y: this.state.snapPositions[this.state.snappedPosition].y,
            }
        })
    }

    onMouseDown(event: MouseEvent<HTMLDivElement>) {
        if (event.button !== 0) return;
        const current = this.floaterRef.current;
        if (current) {
            const pos = {top: current.offsetTop, left: current.offsetLeft}
            this.setState({
                dragging: true,
                relative: {
                    x: event.pageX - pos.left,
                    y: event.pageY - pos.top,
                }
            })
        }
        event.stopPropagation();
        event.preventDefault();
    }

    onMouseMove(event: MouseEvent<HTMLDivElement>) {
        if (!this.state.dragging) return;
        this.setState({
            position: {
                x: event.pageX - this.state.relative.x,
                y: event.pageY - this.state.relative.y,
            }
        });
        event.stopPropagation();
        event.preventDefault();
    }

    onMouseUp(event: MouseEvent<HTMLDivElement>) {
        if (!this.state.dragging) return;
        const currentPosition: WindowPosition = {
            x: event.pageX - this.state.relative.x,
            y: event.pageY - this.state.relative.y,
        }

        const dist_sqr: number[] = this.state.snapPositions
            .map((pos) => Math.pow(currentPosition.x - pos.x, 2)
                + Math.pow(currentPosition.y - pos.y, 2));

        const id = dist_sqr.indexOf(Math.min(...dist_sqr));

        this.setState({
            dragging: false,
            position: this.state.snapPositions[id],
            snappedPosition: id,
        });
        event.stopPropagation();
        event.preventDefault();
    }

    onMouseEnter(event: MouseEvent<HTMLDivElement>) {
        this.setState({
            showContent: true,
        });
    }

    onMouseLeave(event: MouseEvent<HTMLDivElement>) {
        this.setState({
            showContent: false,
        });
    }

    render() {
        return (
            <div className={'floater'} style={{
                left: this.state.position.x,
                top: this.state.position.y,
            }}
                 ref={this.floaterRef}
                 onMouseDown={this.onMouseDown.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
            >
                <div style={{
                    display: (this.state.showContent || this.state.dragging) ? 'block' : 'none',
                    position: 'absolute',
                    left: [FloaterSnapPosition.TOP_LEFT, FloaterSnapPosition.MID_LEFT, FloaterSnapPosition.BOTTOM_LEFT]
                        .includes(this.state.snappedPosition) ? '0' : 'auto',
                    right: [FloaterSnapPosition.TOP_RIGHT, FloaterSnapPosition.MID_RIGHT, FloaterSnapPosition.BOTTOM_RIGHT]
                        .includes(this.state.snappedPosition) ? '-80px' : 'auto',
                    top: [FloaterSnapPosition.TOP_RIGHT, FloaterSnapPosition.TOP_LEFT].includes(this.state.snappedPosition)
                        ? '80px' : 'auto',
                    bottom: [FloaterSnapPosition.TOP_RIGHT, FloaterSnapPosition.TOP_LEFT].includes(this.state.snappedPosition)
                        ? 'auto' : '0',
                    paddingBottom: [FloaterSnapPosition.TOP_RIGHT, FloaterSnapPosition.TOP_LEFT].includes(this.state.snappedPosition)
                        ? '0' : '20px',
                    paddingTop: [FloaterSnapPosition.TOP_RIGHT, FloaterSnapPosition.TOP_LEFT].includes(this.state.snappedPosition)
                        ? '20px' : '0',
                }}>
                    {this.props.children}
                </div>
                <div className='float-base'/>
            </div>
        );
    }
}

export default Floater;
