package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

type Step struct {
    direction string
    distance int 
}

func readInput(fname string) (input [][]Step, err error) {
	bytes, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(bytes), "\n")
	input = make([][]Step, 0, len(lines))
	for _, line := range lines {
		if len(line) == 0 {
			continue
		}

        steps := strings.Split(line, ",")
        step_nums := make([]Step, 0, len(steps))
		for _, step := range steps {
            direction :=  step[0:1]
            distance, err := strconv.Atoi(step[1:len(step)])
			if err != nil {
				return nil, err
			}
            step_nums = append(step_nums, Step{direction, distance})
		}
		input = append(input, step_nums)
	}

	return input, nil
}

func part1(input [][]Step) Step {
	return input[0][0]
}

func part2(input [][]Step) int {
	return 0
}

func main() {
	input, err := readInput("day3/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("part1: ", part1(input))
}
