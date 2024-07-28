import React from "react";
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import {ComboboxMockData} from "../../../../__mocks__/combobox";
import ComboboxDropdown from "@/components/Combobox";

describe('Combobox Component', () => {
  it('should render with placeholder and dropdown closed', () => {
    render(<ComboboxDropdown options={ComboboxMockData} placeholder="placeholder" />);

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('placeholder', 'placeholder');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is not visible
  });

  it('should open dropdown on button click and display the options', async () => {
    render(<ComboboxDropdown options={ComboboxMockData} placeholder="placeholder"  />);

    const button = screen.getByRole('button');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Vanilla JS')).toBeInTheDocument();

  });


  it('Select a value from the combobox list', async() => {
    const onChangeMock = jest.fn();
    render(<ComboboxDropdown options={ComboboxMockData} placeholder="placeholder" onChange={onChangeMock}/>);
    const button = screen.getByRole('button');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Vanilla JS')).toBeInTheDocument();

    fireEvent.click(screen.getByText('React'));
    expect(onChangeMock).toHaveBeenCalledWith({ id: 1, name: 'React' });
  });

   it('filters the options based on input value', async () => {
      render(<ComboboxDropdown onChange={() => {}} placeholder="placeholder" options={ComboboxMockData} />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); 
      const button = screen.getByRole('button');
      fireEvent.click(button);
      await screen.findByRole('listbox');
  
      const input = screen.getByPlaceholderText('placeholder');
      fireEvent.change(input, { target: { value: 'React', id: 1 } });

      await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      });

      screen.debug();
    });

  it('Display No Results option when no options are present', async() => {
   
    render(<ComboboxDropdown options={ComboboxMockData}  placeholder="placeholder"/>);
    const input = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.change(input, { target: { value: 'NonexistentSkill' } });

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    await screen.findByText('No Results');

    expect(screen.getByText('No Results')).toBeInTheDocument();
  
  });

  it('Close the combo box when clicked outside', async () => {

    render(
      <div>
      <ComboboxDropdown
        onChange={() => {}}
        placeholder="placeholder"
        options={ComboboxMockData}
      />
      <div data-testid="outside-element">Outside Element</div>
    </div>
    );
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    // Ensure the dropdown is open
    await screen.findByRole('listbox');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    const outsideElement = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideElement);
    fireEvent.mouseUp(outsideElement);
    fireEvent.click(outsideElement);
  
    // Wait for the dropdown to close
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    });

});