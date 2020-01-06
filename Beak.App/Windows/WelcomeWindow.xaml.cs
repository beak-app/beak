using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Beak.App.ViewModels;
using Beak.UserInterface.Native;

namespace Beak.App.Windows
{
	/// <summary>
	/// Interaction logic for WelcomeWindow.xaml
	/// </summary>
	public partial class WelcomeWindow : Window
	{
		private Button _buttonWindowClose { get; set; }

		public WelcomeViewModel ViewModel { get { return DataContext as WelcomeViewModel; } }

		public WelcomeWindow()
		{
			InitializeComponent();

			DataContext = new WelcomeViewModel(ApplicationService.Instance.EventAggregator);
			WindowStartupLocation = WindowStartupLocation.CenterScreen;

			DwmDropShadow.DropShadowToWindow(this);
		}

		private T GetRequiredTemplateChild<T>(string childName) where T : DependencyObject
		{
			return (T)GetTemplateChild(childName);
		}

		public override void OnApplyTemplate()
		{
			_buttonWindowClose = GetRequiredTemplateChild<Button>("ButtonWindowClose");

			_buttonWindowClose.Click += buttonWindowClose_Click;

			base.OnApplyTemplate();
		}

		private void buttonWindowClose_Click(object sender, RoutedEventArgs e)
		{
			Close();
		}

		private void Grid_MouseDown(object sender, MouseButtonEventArgs e)
		{
			DragMove();
		}
	}
}
