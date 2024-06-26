import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Alert } from 'react-native';
import params from './src/params';
import Minefield from './src/components/Minefield';
import Header from './src/components/Header';
import { generate_mine_board, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed } from './src/functions';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.createState();
    }

    minesAmount = () => {
        const cols = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return Math.ceil(cols * rows * params.difficultLevel);
    }

    createState = () => {
        const cols = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return {
            board: generate_mine_board(rows, cols, this.minesAmount()),
            won: false,
            lost: false,
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board);
        openField(board, row, column);
        const lost = hadExplosion(board);
        const won = wonGame(board);

        if (lost) {
            showMines(board);
            Alert.alert('Você perdeu!', 'Tente novamente!');
        }

        if (won) {
            Alert.alert('Parabéns', 'Você venceu!');
        }

        this.setState({ board, lost, won });
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board);
        invertFlag(board, row, column);
        const won = wonGame(board);

        if (won) {
            Alert.alert('Parabéns', 'Você venceu!');
        }

        this.setState({ board, won });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                />
                <View style={styles.board}>
                    <Minefield
                        board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#AAA',
    }
});